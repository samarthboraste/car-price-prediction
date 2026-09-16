from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib


# Load trained ML model
model = joblib.load("used_car_price_model.pkl")


# Create FastAPI application
app = FastAPI(
    title="Used Car Price Prediction API",
    description="API for predicting used car prices",
    version="1.0.0"
)


# CORS - useful for local frontend testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Input data structure
class CarData(BaseModel):
    brand: str
    model: str
    year: int
    age: int
    kmDriven: float
    transmission: str
    owner: str
    fuelType: str


# Home endpoint
@app.get("/")
def home():
    return {
        "message": "Used Car Price Prediction API is running"
    }


# Health check
@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True
    }


# Price prediction
@app.post("/predict")
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

    # Make prediction
    prediction = model.predict(input_data)[0]

    prediction = float(prediction)

    return {
        "success": True,
        "predicted_price": round(prediction, 2),
        "price_in_lakhs": round(prediction / 100000, 2),
        "formatted_price": f"₹{prediction:,.0f}"
    }