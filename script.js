function submitAddress() {
    const address = '1600 Amphitheatre Parkway, Mountain View, CA';
    document.getElementById("output").innerText = `Address: ${address}`;
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const url = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Process the JSON data here
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

}