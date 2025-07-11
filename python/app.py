from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)  


with open("nn_model.pkl", "rb") as f:
    nn_model = pickle.load(f)
with open("ohe.pkl", "rb") as f:
    ohe = pickle.load(f)
with open("tfidf.pkl", "rb") as f:
    tfidf = pickle.load(f)
with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)
training_data = pd.read_csv("augmented_training_data.csv")

@app.route("/test_recommendation", methods=["POST"])
def test_recommendation():
    user_input = request.get_json()

    required_keys = {"brand", "name", "price"}
    if not required_keys.issubset(user_input):
        return jsonify({"error": "Missing brand, name, or price in JSON"}), 400

    try:
        brand_vec = ohe.transform([[user_input["brand"]]])
        name_vec = tfidf.transform([user_input["name"]]).toarray()
        price_vec = scaler.transform([[user_input["price"]]])
        query_vec = np.hstack([brand_vec, name_vec, price_vec])
        distances, indices = nn_model.kneighbors(query_vec)

      
        seen_names = set()
        query_name = user_input["name"].strip().lower()
        unique_recs = []

        for idx in indices[0]:
            rec = training_data.iloc[idx]
            name = rec["name"].strip().lower()
            if name != query_name and name not in seen_names:
                seen_names.add(name)
                unique_recs.append({
                    "brand": rec["brand"],
                    "name": rec["name"],
                    "product_type": rec["product_type"],
                    "price": rec["price"]
                })

        return jsonify(unique_recs[:5])

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
