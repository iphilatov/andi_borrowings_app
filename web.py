from flask import Flask, render_template, request
import os
import json
import requests

app = Flask(__name__)

#REST_URL = os.environ.get("REST_URL", "http://localhost/")

@app.route('/')
def startup_home():
    return render_template('index.html.j2')

if __name__ == '__main__':
    app.run(debug = True, host = '0.0.0.0')  