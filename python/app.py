#pip install flask requests
#pip install flask-cors

from flask import Flask, jsonify
import requests
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  

@app.route('/api/products')
def api_products(): 
    """API endpoint that returns products as JSON"""
    try:
        response = requests.get('http://localhost:3000/api/all-products')
        response.raise_for_status()  
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

