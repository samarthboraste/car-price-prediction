# 🚗 Car Price Prediction

A machine learning web application that predicts the estimated price of a used car based on its details.

🔗 **Live Demo:**  
https://huggingface.co/spaces/samarthb20/car-price-prediction

---

## 📌 About the Project

Buying or selling a used car can make it difficult to determine a reasonable price. This project uses **Machine Learning** to estimate the price of a used car based on important details such as its brand, model, age, kilometers driven, transmission, ownership, and fuel type.

The application provides a simple web interface where users can enter their car details and get an estimated price instantly.

---

## ⚙️ How It Works

The project follows a simple machine learning workflow:

1. 📊 Used car data is collected and cleaned.
2. 🔍 Relevant features are selected for training.
3. 🧹 Numerical and categorical data are preprocessed.
4. 🌲 A **Random Forest Regressor** is trained on the dataset.
5. 🔄 The trained model is converted into **ONNX** format.
6. 🌐 The ONNX model runs directly in the browser using **ONNX Runtime Web**.
7. 💰 The application displays the predicted car price.

---

## 🤖 Machine Learning Model

The project uses a **Random Forest Regressor** for predicting the car price.

### Model Configuration

- Algorithm: Random Forest Regressor
- Number of Estimators: 300
- Maximum Depth: 15
- Random State: 42
- Categorical Encoding: One-Hot Encoding
- Unknown Categories: Ignored

---

## 📊 Features Used

The model uses the following car details:

| Feature | Description |
|---|---|
| Brand | Manufacturer of the car |
| Model | Model of the car |
| Year | Manufacturing year |
| Age | Age of the vehicle |
| kmDriven | Total kilometers driven |
| Transmission | Manual or Automatic |
| Owner | Ownership history |
| FuelType | Fuel type of the vehicle |

🎯 **Target Variable:** `AskPrice`

---

## 🛠️ Technologies Used

- 🐍 Python
- 🧮 Pandas & NumPy
- 🤖 Scikit-learn
- 🌲 Random Forest
- 🔄 ONNX
- 🌐 ONNX Runtime Web
- 🖥️ HTML5
- 🎨 CSS3
- ⚡ JavaScript
- 📦 Git & GitHub
- 🚀 Hugging Face Spaces

---

## 📁 Project Structure

```text
car-price-prediction/
│
├── index.html
├── script.js
├── style.css
├── model.onnx
└── README.md