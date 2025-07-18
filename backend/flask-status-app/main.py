from flask import Flask, jsonify
import time
import random

app = Flask(__name__)

@app.route('/status')
def status():
    """
    Simulates a service endpoint that can experience delays.
    50% of requests will have an artificial delay to simulate a timeout.
    """
    if random.random() < 0.5:
        # Simulate a long-running process that causes a timeout
        time.sleep(10)
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')