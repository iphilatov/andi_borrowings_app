from flask import Flask, render_template, request
import os
import json
import requests

app = Flask(__name__)

@app.route('/')
def startup_base():
    return render_template('home.html.j2')

@app.route('/about')
def startup_home():
    return render_template('about.html.j2')


if __name__ == '__main__':
    app.run(debug = True, host = '0.0.0.0')  