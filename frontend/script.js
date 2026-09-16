const API_URL = "http://127.0.0.1:8000/predict";


const form = document.getElementById("predictionForm");

const result = document.getElementById("result");
const error = document.getElementById("error");
const loading = document.getElementById("loading");

const price = document.getElementById("price");
const lakhs = document.getElementById("lakhs");


form.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Hide previous messages
    result.classList.add("hidden");
    error.classList.add("hidden");

    // Show loading
    loading.classList.remove("hidden");


    // Get form values
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;

    const year = Number(
        document.getElementById("year").value
    );

    const age = Number(
        document.getElementById("age").value
    );

    const kmDriven = Number(
        document.getElementById("kmDriven").value
    );

    const transmission =
        document.getElementById("transmission").value;

    const owner =
        document.getElementById("owner").value;

    const fuelType =
        document.getElementById("fuelType").value;


    // Data sent to FastAPI
    const carData = {

        brand: brand,

        model: model,

        year: year,

        age: age,

        kmDriven: kmDriven,

        transmission: transmission,

        owner: owner,

        fuelType: fuelType

    };


    try {

        const response = await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(carData)
            }
        );


        if (!response.ok) {
            throw new Error("API request failed");
        }


        const data = await response.json();


        // Display prediction
        price.textContent =
            data.formatted_price;

        lakhs.textContent =
            `₹${data.price_in_lakhs} lakh`;


        result.classList.remove("hidden");


    } catch (err) {

        console.error(err);

        error.textContent =
            "Unable to connect to the prediction server. Make sure FastAPI is running.";

        error.classList.remove("hidden");

    } finally {

        loading.classList.add("hidden");

    }

});