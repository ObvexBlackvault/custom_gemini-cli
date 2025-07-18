# Flask Status App

A simple Flask application with a `/status` endpoint to demonstrate a high-traffic scenario.

## Setup and Running

1.  Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

2.  Run the application:

    ```bash
    gunicorn --bind 0.0.0.0:8000 --workers 4 main:app
    ```

3.  Access the endpoint:
    ```
    curl http://localhost:8000/status
    ```
