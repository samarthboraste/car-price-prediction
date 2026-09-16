# Car Price Prediction

A machine learning web application that estimates the price of a used car based on its specifications and usage history.

## Live Demo

https://huggingface.co/spaces/samarthb20/car-price-prediction

## Overview

The purpose of this project is to estimate the market price of a used car using machine learning.

The application takes basic information about a vehicle and returns an estimated price in Indian Rupees. The prediction is generated using a trained Random Forest regression model.

The model has been converted to ONNX format so that inference can be performed directly in the browser without requiring a separate backend server.

## Input Features

The application uses the following features for prediction:

| Feature | Description |
|---|---|
| Brand | Manufacturer of the vehicle |
| Model | Model name |
| Year | Manufacturing year |
| Age | Age of the vehicle |
| kmDriven | Total kilometers driven |
| Transmission | Transmission type |
| Owner | Ownership history |
| FuelType | Fuel type |

The target variable used for training is `AskPrice`.

## Machine Learning

The project uses a Random Forest Regressor trained on a used-car dataset.

### Model Configuration

- Model: Random Forest Regressor
- Number of estimators: 300
- Maximum depth: 15
- Random state: 42
- Categorical features: One-Hot Encoding
- Unknown categories: Ignored

The dataset was cleaned and preprocessed before training. Numerical features were converted into appropriate numeric formats, while categorical features were encoded using One-Hot Encoding.

## Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn
- Random Forest Regressor
- ONNX
- ONNX Runtime Web
- HTML
- CSS
- JavaScript
- Git
- GitHub
- Hugging Face Spaces

## Application Workflow

```text
User Input
    |
    v
Car Details
    |
    v
ONNX Model
    |
    v
Random Forest Prediction
    |
    v
Estimated Car Price