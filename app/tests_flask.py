from flask import Flask
app = Flask(__name__)

@app.route('/about')
def hello_world():
    return 'Hello Mitchell,through Flask you have reached Elliotts function'
