from IPython.display import display_html
import html
import random
import pkgutil
import codecs
import json
import numpy as np
import pandas as pd
import functools
import copy
import concurrent.futures
from sklearn.metrics import log_loss
from scipy import stats
from risk_control import *
class Slice:
    def __init__(self, filters, data_idx):
        self.filters = filters
        self.data_idx = data_idx
        self.size = len(data_idx)
        self.effect_size = None
        self.metric = None

    def get_filter(self):
        return self.filters

    def set_filter(self, filters):
        self.filters = filters

    def set_metric(self, metric):
        self.metric = metric

    def set_effect_size(self, effect_size):
        self.effect_size = effect_size

    def union(self, s):
        if set(self.filters.keys()) == set(s.filters.keys()):
            for k in self.filters.keys():
                self.filters[k] = self.filters[k] + s.filters[k]
        else:
            return False

        idx = self.data_idx.difference(s.data_idx)
        self.data_idx = idx.append(s.data_idx)
        self.size = len(self.data_idx)

        return True

    def intersect(self, s):
        for k, v in list(s.filters.items()):
            if k not in self.filters:
                self.filters[k] = v
            else:
                for condition in s.filters[k]:
                    if condition not in self.filters[k]:
                        self.filters[k].append(condition)

        idx = self.data_idx.intersection(s.data_idx)
        self.data_idx = idx
        self.size = len(self.data_idx)

        return True

    def __str__(self):
        slice_desc = ''
        for k, v in list(self.filters.items()):
            slice_desc += '%s:%s ' % (k, v)
        return slice_desc


class SliceFinder:
    def __init__(self, model, data):
        self.model = model
        self.data = data
        self.slices = []
        self.samples = {}

    def find_slice(self, k=50, epsilon=0.2, alpha=0.05, degree=3, risk_control=True, max_workers=1):
        ''' Find interesting slices '''
        ''' risk_control parameter is obsolete; we do post processing for it '''
        assert k > 0, 'Number of recommendation k should be greater than 0'

        metrics_all = self.evaluate_model(self.data)
        reference = (np.mean(metrics_all), np.std(
            metrics_all), len(metrics_all))

        slices = []
        uninteresting = []
        for i in range(1, degree+1):
            print('degree %s' % i)
            # degree 1~3 feature crosses
            print('crossing')
            if i == 1:
                candidates = self.slicing()
            else:
                candidates = self.crossing(uninteresting, i)
            print('effect size filtering')
            interesting, uninteresting_ = self.filter_by_effect_size(candidates, reference, epsilon, max_workers=max_workers, risk_control=risk_control)
            uninteresting += uninteresting_
            slices += interesting
            if len(slices) >= k:
                break

        print('sorting')
        slices = sorted(slices, key=lambda s: s.size, reverse=True)
        recommendations = slices[:k]

        self.save_slices_to_file(recommendations, reference[0], 'slices.json')
        self.compute_overlapping_samples(recommendations, 'overlapping_samples.json')
        self.count_common_samples('common_samples.json')
            
        return recommendations

    def save_slices_to_file(self, recommendations, model_average, filename):
        slices = []
        for s in recommendations:
            slice = {}
            description = ''
            for i in range(len(s.get_filter().keys())):
                if (i > 0):
                    description += ', '
                description += str(list(s.get_filter().keys())[i]) + ': ' + str(list(s.get_filter().values())[i][0][0])
            slice[description] = {
                "slice": description,
                "effect_size": s.effect_size,
                "metric": s.metric,
                "size": s.size,
                "degree": len(s.get_filter().keys()),
                "data_idx": list(s.data_idx)
            }
            slices.append(slice)
        data = {}
        self.slices = slices
        data["data"] = slices
        data["model"] = model_average
        
        if (filename == None):
            return json.dumps(data)

        with open(filename, 'w') as f:
            json.dump(data, f)
        
        return json.dumps(data)

    def compute_overlapping_samples(self, recommendations, filename):
        sampleDict = {}
        for s in recommendations:
            sliceSet = set()
            description = ''
            keyList = list(s.get_filter().keys())
            valueList = list(s.get_filter().values())
            for i in range(len(s.get_filter().keys())):
                if (i > 0):
                    description += ', '
                description += str(keyList[i]) + ': ' + str(valueList[i][0][0])
            for i in range(len(s.get_filter().keys())):
                for index, row in self.data[0].iterrows():
                    for key in keyList:
                        if row[key] == valueList[i][0][0]:
                            sliceSet.add(index)
            sampleDict[description] = sliceSet
        for key in sampleDict.keys():
            sampleDict[key] = list(sampleDict[key])
        self.samples=sampleDict

        if (filename == None):
            return json.dumps(sampleDict)

        with open(filename, "w") as outfile:
            json.dump(sampleDict, outfile)

        return json.dumps(sampleDict)
    
    def count_common_samples(self, filename):
        commonSamples = {}
        for s1 in range(0, len(self.slices) - 1):
            for s2 in range(1, len(self.slices)):
                slice1 = list(self.slices[s1].keys())[0]
                slice2 = list(self.slices[s2].keys())[0]
                arr1 = self.samples[slice1]
                arr2 = self.samples[slice2]
                if (arr1 is None or arr2 is None):
                    return 0
                random.shuffle(arr1)
                arr1 = arr1[0:2000]
                count = len([value for value in arr1 if value in arr2])
                commonSamples[slice1 + '-' + slice2] = count
                commonSamples[slice2 + '-' + slice1] = count

        if (filename == None):
            return json.dumps(commonSamples)

        with open(filename, "w") as outfile:
            json.dump(commonSamples, outfile)
        
        return json.dumps(commonSamples)

    def slicing(self):
        ''' Generate base slices '''
        X, y = self.data[0], self.data[1]
        n, m = X.shape[0], X.shape[1]

        slices = []
        for col in X.columns:
            uniques, counts = np.unique(X[col], return_counts=True)
            if len(uniques) == n:
                continue
            if len(uniques) > n/2.:
                bin_edges = self.binning(X[col], n_bin=10)
                for i in range(len(bin_edges)-1):
                    data_idx = X[np.logical_and(
                        bin_edges[i] <= X[col], X[col] < bin_edges[i+1])].index
                    s = Slice(
                        {col: [[bin_edges[i], bin_edges[i+1]]]}, data_idx)
                    slices.append(s)
            else:
                for v in uniques:
                    data_idx = X[X[col] == v].index
                    s = Slice({col: [[v]]}, data_idx)
                    slices.append(s)

        return slices

    def crossing(self, slices, degree):
        ''' Cross uninteresting slices together '''
        crossed_slices = []
        for i in range(len(slices)-1):
            for j in range(i+1, len(slices)):
                if len(slices[i].filters) + len(slices[j].filters) == degree:
                    slice_ij = copy.deepcopy(slices[i])
                    slice_ij.intersect(slices[j])
                    crossed_slices.append(slice_ij)
        return crossed_slices

    def evaluate_model(self, data, metric=log_loss, reverse=False):
        ''' evaluate model on a given data (X, y), example by example '''
        X, y = copy.deepcopy(data[0]), copy.deepcopy(data[1])
        X['Label'] = y
        X = X.dropna()
        y = X['Label']
        X = X.drop(['Label'], axis=1)

        y_p = self.model.predict_proba(X)
        y_pred = self.model.predict(X)
        y_actual = np.array(y)
        y_pred = list(map(functools.partial(np.expand_dims, axis=0), y_pred))
        y_p = list(map(functools.partial(np.expand_dims, axis=0), y_p))
        y = list(map(functools.partial(np.expand_dims, axis=0), y))
        if metric == log_loss:
            if (reverse):
                l = map(functools.partial(
                    log_loss, labels=self.model.classes_), y, y_p)
                return list(map(lambda x: -1 * x, l))
            return list(map(functools.partial(metric, labels=self.model.classes_), y, y_p))

    def filter_by_effect_size(self, slices, reference, epsilon=0.5, max_workers=1, alpha=0.05, risk_control=True):
        ''' Filter slices by the minimum effect size '''
        filtered_slices = []
        rejected = []

        with concurrent.futures.ProcessPoolExecutor(max_workers=max_workers) as executor:
            batch_jobs = []
            for s in slices:
                if s.size == 0:
                    continue
                batch_jobs.append(executor.submit(
                    self.eff_size_job, s, reference, alpha))
            for job in concurrent.futures.as_completed(batch_jobs):
                if job.cancelled():
                    continue
                elif job.done():
                    s = job.result()
                    if s.effect_size >= epsilon:
                        filtered_slices.append(s)
                    else:
                        rejected.append(s)
        return filtered_slices, rejected

    def eff_size_job(self, s, reference, alpha=0.05):
        data = (self.data[0].loc[s.data_idx], self.data[1].loc[s.data_idx])
        m_slice = self.evaluate_model(data)
        eff_size = effect_size(m_slice, reference)

        s.set_metric(np.mean(m_slice))
        s.set_effect_size(eff_size)
        return s 

    def merge_slices(self, slices, reference, epsilon):
        ''' Merge slices with the same filter attributes
            if the minimum effect size condition is satisfied '''
        merged_slices = []

        sorted_slices = sorted(
            slices, key=lambda x: x.effect_size, reverse=True)
        taken = []
        for i in range(len(sorted_slices)-1):
            if i in taken:
                continue

            s_ = copy.deepcopy(sorted_slices[i])
            taken.append(i)
            for j in range(i, len(sorted_slices)):
                if j in taken:
                    continue

                prev = copy.deepcopy(s_)
                if s_.union(sorted_slices[j]):
                    m_s_ = self.evaluate_model(
                        (self.data[0].loc[s_.data_idx], self.data[1].loc[s_.data_idx]))
                    eff_size = effect_size(m_s_, reference)
                    if eff_size >= epsilon:
                        s_.set_effect_size(eff_size)
                        taken.append(j)
                    else:
                        s_ = prev

            merged_slices.append(s_)

        return merged_slices

    def filter_by_significance(self, slices, reference, alpha, max_workers=10):
        ''' Return significant slices '''
        filtered_slices, bf_filtered_slices, ai_filtered_slices = [], [], []
        rejected, bf_rejected, ai_rejected = [], [], []

        test_results = []
        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            batch_jobs = dict()
            for s in slices:
                if s.size == 0:
                    continue

                data = (self.data[0].loc[s.data_idx],
                        self.data[1].loc[s.data_idx])
                batch_jobs[executor.submit(
                    self.significance_job, data, reference, alpha, len(slices))] = s

            for job in concurrent.futures.as_completed(batch_jobs):
                if job.cancelled():
                    continue
                elif job.done():
                    test_results.append((batch_jobs[job], job.result()))

        alpha_wealth = alpha
        for r in test_results:
            s, p = r[0], r[1]
            if p <= alpha:
                filtered_slices.append(s)
            else:
                rejected.append(s)
            if p <= alpha/len(test_results):
                bf_filtered_slices.append(s)
            else:
                bf_rejected.append(s)
            if p <= alpha_wealth:
                ai_filtered_slices.append(s)
                alpha_wealth += alpha
            else:
                ai_rejected.append(s)
                alpha_wealth -= alpha/(1.-alpha)

        return filtered_slices, rejected, bf_filtered_slices, bf_rejected, ai_filtered_slices, ai_rejected

    def significance_job(self, data, reference, alpha, n_slices, ):
        m_slice = self.evaluate_model(data)
        test_result = t_testing(m_slice, reference, alpha)
        return test_result

    def binning(self, col, n_bin=20):
        ''' Equi-height binning '''
        bin_edges = stats.mstats.mquantiles(
            col, np.arange(0., 1.+1./n_bin, 1./n_bin))
        return bin_edges
    
    def find_slices_and_visualize(self, k=50, epsilon=0.2, alpha=0.05, degree=3, risk_control=True, max_workers=1):
        ''' Find interesting slices and generate visual auditor '''
        assert k > 0

        metrics_all = self.evaluate_model(self.data)
        reference = (np.mean(metrics_all), np.std(
            metrics_all), len(metrics_all))

        slices = []
        uninteresting = []
        for i in range(1, degree+1):
            print('degree %s' % i)
            print('crossing')
            if i == 1:
                candidates = self.slicing()
            else:
                candidates = self.crossing(uninteresting, i)
            print('effect size filtering')
            interesting, uninteresting_ = self.filter_by_effect_size(candidates, reference, epsilon, max_workers=max_workers, risk_control=risk_control)
            uninteresting += uninteresting_
            slices += interesting
            if len(slices) >= k:
                break

        print('sorting')
        slices = sorted(slices, key=lambda s: s.size, reverse=True)
        recommendations = slices[:k]

        slices_str = self.save_slices_to_file(recommendations, reference[0], None)
        samples_str = self.compute_overlapping_samples(recommendations, None)
        common_samples_str = self.count_common_samples(None)

        html_file = codecs.open("bundle.html", 'r')
        html_str = html_file.read()

        html_str = html_str.replace('{"model":"insert log loss slices","data":"insert log loss slices"}', slices_str)
        html_str = html_str.replace('{"model":"insert log loss samples","data":"insert log loss samples"}', samples_str)
        html_str = html_str.replace('{"data":"insert common samples"}', common_samples_str)

        html_str = html.escape(html_str)

        iframe_id = 'visual-auditor-iframe-' + str(int(random.random() * 1e8))

        iframe = '''
            <iframe
                srcdoc="{}"
                frameBorder="0"
                width="100%"
                height="800px"
                id="{}">
            </iframe>
        '''.format(html_str, iframe_id)

        display_html(iframe, raw=True)


def _make_html():
    """
    Function to create an HTML string to bundle Visual Auditor's html, css, and js.
    Args:
        
    Return:
        HTML code
    """
    # HTML template for Visual Auditor widget
    html_top = '''<!DOCTYPE html><html lang="en"><head><meta charset='utf-8'><meta name='viewport' content='width = device-width, initial-scale = 1'><title>Visual Auditor</title><style>html,body{position:relative;width:100%;height:100%}body{color:#333;margin:0;padding:0;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif}a{color:rgb(0,100,200);text-decoration:none}a:hover{text-decoration:underline}a:visited{color:rgb(0,80,160)}label{display:block}input,button,select,textarea{font-family:inherit;font-size:inherit;-webkit-padding:0.4em 0;padding:0.4em;margin:0 0 0.5em 0;box-sizing:border-box;border:1px solid #ccc;border-radius:2px}input:disabled{color:#ccc}</style>'''
    html_bottom = '''</head><body></body></html>'''

    # Read the bundled JS file
    js_string = pkgutil.get_data(__name__, 'visualauditor.js')

    # Inject the JS to the html template
    html_str = html_top + \
        '''<script src='{}'></script>'''.format(js_string) + \
        html_bottom

    return html.escape(html_str)


def visualize():
    """
    Render Visual Auditor in the output cell.
    """  
    html_file = codecs.open("bundle.html", 'r')
    html_str = html_file.read()

    slices_file = codecs.open("slices.json", 'r')
    slices_str = slices_file.read()
    html_str = html_str.replace('{"model":"insert log loss slices","data":"insert log loss slices"}', slices_str)

    samples_file = codecs.open("overlapping_samples.json", 'r')
    samples_str = samples_file.read()
    html_str = html_str.replace('{"data":"insert log loss samples"}', samples_str)

    common_samples_file = codecs.open("common_samples.json", 'r')
    common_samples_str = common_samples_file.read()
    html_str = html_str.replace('{"data":"insert common samples"}', common_samples_str)

    reverse_slices_file = codecs.open("reverse_slices.json", 'r')
    reverse_slices_str = reverse_slices_file.read()
    html_str = html_str.replace('{"model":"insert reverse log loss slices","data":"insert reverse log loss slices"}', reverse_slices_str)

    reverse_samples_file = codecs.open("reverse_overlapping_samples.json", 'r')
    reverse_samples_str = reverse_samples_file.read()
    html_str = html_str.replace('{"data":"insert reverse log loss samples"}', reverse_samples_str)

    reverse_common_samples_file = codecs.open("reverse_common_samples.json", 'r')
    reverse_common_samples_str = reverse_common_samples_file.read()
    html_str = html_str.replace('{"data":"insert reverse common samples"}', reverse_common_samples_str)

    html_str = html.escape(html_str)

    # Randomly generate an ID for the iframe to avoid collision
    iframe_id = 'visual-auditor-iframe-' + str(int(random.random() * 1e8))

    iframe = '''
        <iframe
            srcdoc="{}"
            frameBorder="0"
            width="100%"
            height="800px"
            id="{}">
        </iframe>
    '''.format(html_str, iframe_id)

    # Display the iframe
    display_html(iframe, raw=True)


def find_slices_and_visualize(model, data, k=50, epsilon=0.2, alpha=0.05, degree=3, risk_control=True, max_workers=1, precompute=True, prefix=''):
    ''' Find interesting slices and generate visual auditor '''
    slices_str = 'test'
    samples_str = ''
    common_samples_str = ''
    reverse_slices_str = ''
    reverse_samples_str = ''
    reverse_common_samples_str = ''

    if (precompute == False):
        sf = SliceFinder(model, data)
        assert k > 0

        metrics_all = sf.evaluate_model(sf.data, metric=log_loss, reverse=False)
        reference = (np.mean(metrics_all), np.std(metrics_all), len(metrics_all))

        slices = []
        uninteresting = []
        for i in range(1, degree+1):
            if i == 1:
                candidates = sf.slicing()
            else:
                candidates = sf.crossing(uninteresting, i)
            interesting, uninteresting_ = sf.filter_by_effect_size(candidates, reference, epsilon, max_workers=max_workers, risk_control=risk_control)
            uninteresting += uninteresting_
            slices += interesting
            if len(slices) >= k:
                break

        slices = sorted(slices, key=lambda s: s.size, reverse=True)
        recommendations = slices[:k]

        slices_str = sf.save_slices_to_file(recommendations, reference[0], prefix + 'slices.json')
        samples_str = sf.compute_overlapping_samples(recommendations, prefix + 'overlapping_samples.json')
        common_samples_str = sf.count_common_samples(prefix + 'common_samples.json')

        metrics_all = sf.evaluate_model(sf.data, metric=log_loss, reverse=True)
        reference = (np.mean(metrics_all), np.std(metrics_all), len(metrics_all))

        slices = []
        uninteresting = []
        for i in range(1, degree+1):
            if i == 1:
                candidates = sf.slicing()
            else:
                candidates = sf.crossing(uninteresting, i)
            interesting, uninteresting_ = sf.filter_by_effect_size(candidates, reference, epsilon, max_workers=max_workers, risk_control=risk_control)
            uninteresting += uninteresting_
            slices += interesting
            if len(slices) >= k:
                break

        slices = sorted(slices, key=lambda s: s.size, reverse=True)
        reverse_recommendations = slices[:k]

        reverse_slices_str = sf.save_slices_to_file(reverse_recommendations, reference[0], prefix + 'reverse_slices.json')
        reverse_samples_str = sf.compute_overlapping_samples(reverse_recommendations, prefix + 'reverse_overlapping_samples.json')
        reverse_common_samples_str = sf.count_common_samples(prefix + 'reverse_common_samples.json')
    else:
        slices_file = codecs.open(prefix + "slices.json", 'r')
        slices_str = slices_file.read()

        samples_file = codecs.open(prefix + "overlapping_samples.json", 'r')
        samples_str = samples_file.read()

        common_samples_file = codecs.open(prefix + "common_samples.json", 'r')
        common_samples_str = common_samples_file.read()

        reverse_slices_file = codecs.open(prefix + "reverse_slices.json", 'r')
        reverse_slices_str = reverse_slices_file.read()

        reverse_samples_file = codecs.open(prefix + "reverse_overlapping_samples.json", 'r')
        reverse_samples_str = reverse_samples_file.read()

        reverse_common_samples_file = codecs.open(prefix + "reverse_common_samples.json", 'r')
        reverse_common_samples_str = reverse_common_samples_file.read()

    html_file = codecs.open("bundle.html", 'r')
    html_str = html_file.read()

    html_str = html_str.replace('{"model":"insert log loss slices","data":"insert log loss slices"}', slices_str)
    html_str = html_str.replace('{"data":"insert log loss samples"}', samples_str)
    html_str = html_str.replace('{"data":"insert common samples"}', common_samples_str)
    html_str = html_str.replace('{"model":"insert reverse log loss slices","data":"insert reverse log loss slices"}', reverse_slices_str)
    html_str = html_str.replace('{"data":"insert reverse log loss samples"}', reverse_samples_str)
    html_str = html_str.replace('{"data":"insert reverse common samples"}', reverse_common_samples_str)

    if (prefix == 'adult_'):
        features_str = "[\"Age\", \"Workclass\", \"Education\", \"Marital Status\", \"Occupation\", \"Relationship\", \"Race\", \"Sex\", \"Capital Gain\", \"Capital Loss\", \"Hours Per Week\", \"Country\"]"
    elif (prefix == 'gc_'):
        features_str = "[\"Checking Account\", \"Duration\", \"Credit History\", \"Purpose\", \"Credit Amount\", \"Savings Account\", \"Employment\", \"Installment Rate\", \"Relationship/Sex\", \"Debtors/Guarantors\", \"Residence Since\", \"Property\", \"Age\", \"Installment Plans\", \"Housing\", \"Existing Credits\", \"Job\", \"Maintenance\", \"Telephone\", \"Foreign\"]"
    elif (prefix == 'cp_'):
        features_str = "[\"State\", \"Account Length\", \"Area Code\", \"International\", \"Voicemail Plan\", \"Voicemail Messages\", \"Day Minutes\", \"Day Calls\", \"Day Charge\", \"Eve Minutes\", \"Eve Calls\", \"Eve Charge\", \"Night Minutes\", \"Night Calls\", \"Night Charge\", \"Intl Minutes\", \"Intl Calls\", \"Intl Charge\", \"CustServ Calls\"]"
    else:
        features_str = "[]"

    html_str = html_str.replace('["insert dataset features"]', features_str)

    html_str = html.escape(html_str)

    iframe_id = 'visual-auditor-iframe-' + str(int(random.random() * 1e8))

    iframe = '''
        <iframe
            srcdoc="{}"
            frameBorder="0"
            width="100%"
            height="800px"
            id="{}">
        </iframe>
    '''.format(html_str, iframe_id)

    display_html(iframe, raw=True)