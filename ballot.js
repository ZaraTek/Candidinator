
function submitAddress() {
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = "United States";
    const zipCode = document.getElementById("zipCode").value;
  
    const combinedAddress = `${address}, ${city}, ${state}, ${zipCode}, ${country}`;
    var apiKey = document.getElementById('apiKey').value;
    var apiUrl = "https://www.googleapis.com/civicinfo/v2/voterinfo?address=" + encodeURIComponent(combinedAddress) + "&key=" + apiKey;
  
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('output').textContent = JSON.stringify(data, null, 2);
            const obj = JSON.parse(data);

            console.log(obj.name); // Output: John
            console.log(obj.age); // Output: 30
            console.log(obj.city); // Output: New York
        });
    document.getElementById('URL').textContent = apiUrl;
}
  
