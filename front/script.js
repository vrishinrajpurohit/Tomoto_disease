document.getElementById('predictionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const resultDiv = document.getElementById('result');
    const file = imageInput.files[0];

    if (!file) {
        resultDiv.innerText = 'Please select an image first.';
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:8000/predict', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            resultDiv.innerText = 'Error uploading image.';
            return;
        }

        const data = await response.json();
        if (data.class && data.confidence) {
            let confidencePercentage = (data.confidence * 100).toFixed(2);
            if (confidencePercentage >= 99.99) {
                confidencePercentage = "99.99";
            }
            resultDiv.innerHTML = `Predicted Class: <strong>${data.class}</strong><br>Confidence: <strong>${confidencePercentage}%</strong>`;
        } else {
            resultDiv.innerText = 'Failed to get prediction.';
        }
    } catch (error) {
        resultDiv.innerText = 'Error: ' + error.message;
    }
});
