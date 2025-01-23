document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;

    // Using the CORS proxy (for development only)
    const apiUrl = 'https://thingproxy.freeboard.io/fetch/https://api.langflow.astra.datastax.com/lf/f72baf0d-27f0-4618-84a5-d44227dc2944/api/v1/run/testRagLearn?stream=false';
    const token = 'AstraCS:eeDdJjUEdQoWflgHGBUavEcN:3892f32bf153f2dd092ffc5142e6cbe6b278391264484ec9209156308a3b0b05'; // Replace with your actual token

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adjust if necessary
            },
            body: JSON.stringify({
                input_value: userInput,
                output_type: "chat",
                input_type: "chat",
                tweaks: {
                    "ChatInput-WZoDb": {},
                    "SplitText-EbhLQ": {},
                    "OpenAIModel-G3Q1d": {},
                    "ChatOutput-BKzc9": {},
                    "OpenAIEmbeddings-7Bv96": {},
                    "AstraDB-MRdOZ": {},
                    "File-mL4eR": {},
                    "MessagetoData-DC7Io": {},
                    "ParseData-oq78N": {},
                    "Prompt-ydmGp": {},
                    "Agent-nmWL0": {},
                    "APIRequest-hTK2E": {}
                }
            })
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            document.getElementById('response').innerText = 'Response: ' + JSON.stringify(data);
        } else {
            const text = await response.text();
            document.getElementById('response').innerText = 'Error: Received non-JSON response: ' + text;
        }
    } catch (error) {
        document.getElementById('response').innerText = 'Error: ' + error.message;
    }
});
