const MODEL_URL = "/model.onnx";

const form = document.getElementById("predictionForm");

const loading = document.getElementById("loading");
const result = document.getElementById("result");
const error = document.getElementById("error");

const predictedPrice =
    document.getElementById("predictedPrice");

const lakhsPrice =
    document.getElementById("lakhsPrice");

const predictButton =
    document.getElementById("predictButton");

const buttonText =
    document.getElementById("buttonText");

let session = null;


// Load ONNX model
async function loadModel() {

    try {

        session = await ort.InferenceSession.create(
            MODEL_URL
        );

        console.log("ONNX model loaded successfully.");

    } catch (err) {

        console.error("Model loading error:", err);

        error.textContent =
            "Unable to load the prediction model.";

        error.style.display = "block";
    }
}


// Load model when page opens
loadModel();


form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        result.style.display = "none";
        error.style.display = "none";

        loading.style.display = "flex";

        predictButton.disabled = true;

        buttonText.textContent = "Calculating...";


        try {

            if (!session) {

                session =
                    await ort.InferenceSession.create(
                        MODEL_URL
                    );
            }


            const brand =
                document.getElementById("brand").value.trim();

            const modelName =
                document.getElementById("model").value.trim();

            const year =
                parseFloat(
                    document.getElementById("year").value
                );

            const age =
                parseFloat(
                    document.getElementById("age").value
                );

            const kmDriven =
                parseFloat(
                    document.getElementById("kmDriven").value
                );

            const transmission =
                document.getElementById("transmission").value;

            const owner =
                document.getElementById("owner").value;

            const fuelType =
                document.getElementById("fuelType").value;


            const inputs = {

                Brand:
                    new ort.Tensor(
                        "string",
                        [brand],
                        [1, 1]
                    ),

                model:
                    new ort.Tensor(
                        "string",
                        [modelName],
                        [1, 1]
                    ),

                Year:
                    new ort.Tensor(
                        "float32",
                        [year],
                        [1, 1]
                    ),

                Age:
                    new ort.Tensor(
                        "float32",
                        [age],
                        [1, 1]
                    ),

                kmDriven:
                    new ort.Tensor(
                        "float32",
                        [kmDriven],
                        [1, 1]
                    ),

                Transmission:
                    new ort.Tensor(
                        "string",
                        [transmission],
                        [1, 1]
                    ),

                Owner:
                    new ort.Tensor(
                        "string",
                        [owner],
                        [1, 1]
                    ),

                FuelType:
                    new ort.Tensor(
                        "string",
                        [fuelType],
                        [1, 1]
                    )
            };


            const output =
                await session.run(inputs);


            const outputName =
                session.outputNames[0];

            const prediction =
                Number(output[outputName].data[0]);


            predictedPrice.textContent =
                `₹${prediction.toLocaleString("en-IN", {
                    maximumFractionDigits: 0
                })}`;


            lakhsPrice.textContent =
                `Approximately ₹${(prediction / 100000).toFixed(2)} Lakhs`;


            result.style.display = "block";


        } catch (err) {

            console.error("Prediction error:", err);

            error.textContent =
                "Unable to calculate the price. Please check your details and try again.";

            error.style.display = "block";

        } finally {

            loading.style.display = "none";

            predictButton.disabled = false;

            buttonText.textContent = "Predict Price";
        }

    }
);