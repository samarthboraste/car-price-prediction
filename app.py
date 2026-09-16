from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import os

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "backend",
    "used_car_price_model.pkl"
)

model = joblib.load(MODEL_PATH)

app = FastAPI(
    title="Used Car Price Prediction API",
    description="API for predicting used car prices",
    version="1.0.0"
)


class CarData(BaseModel):
    brand: str
    model: str
    year: int
    age: int
    kmDriven: float
    transmission: str
    owner: str
    fuelType: str


@app.get("/api")
def home():
    return {
        "message": "Used Car Price Prediction API is running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True
    }


@app.post("/api/predict")
def predict_price(car: CarData):

    input_data = pd.DataFrame({
        "Brand": [car.brand],
        "model": [car.model],
        "Year": [car.year],
        "Age": [car.age],
        "kmDriven": [car.kmDriven],
        "Transmission": [car.transmission],
        "Owner": [car.owner],
        "FuelType": [car.fuelType]
    })

    prediction = model.predict(input_data)[0]
    prediction = float(prediction)

    return {
        "success": True,
        "predicted_price": round(prediction, 2),
        "price_in_lakhs": round(prediction / 100000, 2),
        "formatted_price": f"₹{prediction:,.0f}"
    }