# from slice_finder import SliceFinder
from IPython.display import display_html
import html
import random
import pkgutil

def _make_html():
    """
    Function to create an HTML string to bundle Visual Auditor's html, css, and js.
    Args:
        
    Return:
        HTML code
    """
    # HTML template for GAM Changer widget
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
    Args:
        
    """
    html_str = _make_html()

    # Randomly generate an ID for the iframe to avoid collision
    iframe_id = 'visual-auditor-iframe-' + str(int(random.random() * 1e8))

    iframe = '''
        <iframe
            srcdoc="{}"
            frameBorder="0"
            width="100%"
            height="645px"
            id="{}">
        </iframe>
    '''.format(html_str, iframe_id)

    # Display the iframe
    display_html(iframe, raw=True)