# Visual Auditor
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive visualization system for identifying and understanding biases in machine learning models.

## Working Demo

A live demo of the Visual Auditor web application is available at the following link:
https://visual-auditor.surge.sh/

## Installation

```python
import visual_auditor
```

## Demo Usage
```python
# Import additional packages
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
```

```python
# Helper function for binning numerical features
def bin_feature(feature):
    bins = np.histogram_bin_edges(adult_data[feature], bins=10, range=None, weights=None)
    adult_data[feature] = pd.cut(adult_data[feature], bins, labels=[x for x in range(len(bins) - 1)], right=True, include_lowest=True, duplicates='drop')
    intervals = []
    for i in range(len(bins) - 1):
        intervals.append(f' {int(bins[i])} - {int(bins[i+1])}')
    return intervals
```

```python
# Load Adult dataset
adult_data = pd.read_csv(
    "data/adult.data",
    names=[
        "Age", "Workclass", "Final Weight", "Education", "Education-Num", "Marital Status",
        "Occupation", "Relationship", "Race", "Sex", "Capital Gain", "Capital Loss",
        "Hours Per Week", "Country", "Target"],
        sep=r'\s*,\s*',
        engine='python',
        na_values="?")

# Drop NA values
adult_data = adult_data.dropna()

# Drop irrelevant fields
adult_data = adult_data.drop(columns=['Final Weight', 'Education-Num'])

# Bin numerical features
encoders = {}
encodings = {}
numerical_features = ["Age", "Capital Gain", "Capital Loss", "Hours Per Week"]
for feature in numerical_features:
    encodings[feature] = bin_feature(feature)

# Encode categorical features
for column in adult_data.columns.difference(numerical_features):
    if adult_data.dtypes[column] == np.object:
        le = LabelEncoder()
        adult_data[column] = le.fit_transform(adult_data[column])
        encoders[column] = le
        encodings[column] = le.classes_
        print(column, le.classes_, le.transform(le.classes_))

# Separate Target values
X, y = adult_data[adult_data.columns.difference(["Target"])], adult_data["Target"]

# Train a classifier
classifier = RandomForestClassifier(max_depth=5, n_estimators=10)
classifier.fit(X, y)
```

```python
# Interact with the Visual Auditor
visual_auditor.find_slices_and_visualize(classifier, (X, y))
```


## Credits
The **Visual Auditor** was developed and maintained by [David Munechika](https://github.com/davidmunechika), [Jay Wang](https://github.com/xiaohk), and [Polo Chau](https://www.cc.gatech.edu/~dchau/) from the [Polo Club of Data Science](https://poloclub.github.io/) at Georgia Tech.

## License
The **Visual Auditor** is available under the  [MIT License](LICENSE).
The **Visual Auditor** uses the D3.js which is licensed under the [ISC License](https://github.com/d3/d3/blob/main/LICENSE) and React.js which is licensed under the [MIT License](https://github.com/facebook/react/blob/main/LICENSE).