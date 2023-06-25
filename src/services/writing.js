export async function getMetrics(text_value = "Hello World!!!") {
    const text = text_value.trim();

    try {
        const response = await fetch('http://localhost:8000/comment/scoring', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.log('Request failed with status:', response.status);
        }
    } catch (err) {
        console.log('An error occurred:', err);
    }
    return null;
}
