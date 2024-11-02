
function submitAddress() {
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const country = document.getElementById("country").value;
  const zipCode = document.getElementById("zipCode").value;

  const combinedAddress = `${address}, ${city}, ${state}, ${zipCode}, ${country}`;
  var apiKey = document.getElementById('apiKey').value;
  var apiUrl = "https://www.googleapis.com/civicinfo/v2/voterinfo?address=" + encodeURIComponent(combinedAddress) + "&key=" + apiKey;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          document.getElementById('output').textContent = JSON.stringify(data, null, 2);
      });
  document.getElementById('URL').textContent = apiUrl;
}
