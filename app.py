from flask import Flask, render_template, request, jsonify
import requests
import json
import time

app = Flask(__name__)

request_counts = {}

@app.route('/submit_pfb', methods=['POST'])
def submit_pfb_transaction():
    ip_address = request.remote_addr
    current_time = time.time()

    if ip_address in request_counts:
        timestamps = request_counts[ip_address]
        request_counts[ip_address] = [t for t in timestamps if t > current_time - 60] + [current_time]
        if len(request_counts[ip_address]) >= 10:
            return jsonify({'status': 'error', 'message': 'Too many requests. Please wait a minute and try again.'}), 429
    else:
        request_counts[ip_address] = [current_time]

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        namespace_id_value = data['namespace_id']
        datavalue = data['data']

        headers = {'Content-Type': 'application/json'}
        data = {
            "namespace_id": namespace_id_value,
            "data": datavalue,
            "gas_limit": 80000,
            "fee": 2000
        }
        response = requests.post('http://localhost:26659/submit_pfb', headers=headers, data=json.dumps(data))
        return response.text

    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
