function submitAddress() {
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const country = 'United States';
  const zipCode = document.getElementById('zipCode').value;

  const combinedAddress = `${address}, ${city}, ${state}, ${zipCode}, ${country}`;
  var apiKey = document.getElementById('apiKey').value;
  var apiUrl =
    'https://www.googleapis.com/civicinfo/v2/voterinfo?address=' +
    encodeURIComponent(combinedAddress) +
    '&key=' +
    apiKey;
  var offices = [];

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      var resultsContainer = document.getElementById('ballot');

      resultsContainer.innerHTML = '';

      if (data.contests && data.contests.length > 0) {
        data.contests.forEach((contest) => {
          var office = contest.office;

          var button = document.createElement('button');
          var dropdownInnerContainer = document.createElement('div');
          dropdownInnerContainer.classList.add('dropdown-inner-container');

          var span = document.createElement('span');
          span.textContent = office;

          var svg = document.createElement('svg');
          svg.setAttribute('width', '10');
          svg.setAttribute('height', '10');
          svg.setAttribute('viewBox', '0 0 10 10');
          svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          var path = document.createElement('path');
          path.setAttribute('d', 'M1 3 L5 7 L9 3');
          path.setAttribute('stroke', 'black');
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('fill', 'none');
          svg.appendChild(path);

          dropdownInnerContainer.appendChild(span);
          dropdownInnerContainer.appendChild(svg);

          button.appendChild(dropdownInnerContainer);

          var candidatesDiv = document.createElement('div');
          candidatesDiv.classList.add('candidates');
          candidatesDiv.style.display = 'none';

          button.addEventListener('click', () => {
            if (candidatesDiv.style.display === 'none') {
              candidatesDiv.style.display = 'block';
            } else {
              candidatesDiv.style.display = 'none';
            }
          });

          if (contest.candidates && contest.candidates.length > 0) {
            contest.candidates.forEach((candidate) => {
              var candidateCard = document.createElement('div');
              candidateCard.classList.add('candidate-card');

              var candidateContainer = document.createElement('div');
              candidateContainer.classList.add('candidate-container');

              var img = document.createElement('img');
              img.setAttribute('height', '80px');
              img.setAttribute('width', '80px');
              img.setAttribute('src', 'https://via.placeholder.com/80');
              img.setAttribute('alt', 'candidate-image');

              var candidateInfo = document.createElement('div');
              candidateInfo.classList.add('candidate-info');

              var candidateNameSpan = document.createElement('span');
              candidateNameSpan.textContent = candidate.name;

              var candidateDetailsDiv = document.createElement('div');
              candidateDetailsDiv.classList.add('candidate-details');

              var candidatePartySpan = document.createElement('span');
              candidatePartySpan.textContent =
                candidate.party || 'No Party Info';

              candidateDetailsDiv.appendChild(candidatePartySpan);

              candidateInfo.appendChild(candidateNameSpan);
              candidateInfo.appendChild(candidateDetailsDiv);

              candidateContainer.appendChild(img);
              candidateContainer.appendChild(candidateInfo);

              candidateCard.appendChild(candidateContainer);

              var emailButton = document.createElement('button');
              emailButton.setAttribute(
                'onclick',
                `generateEmail('${candidate.name}')`
              );
              emailButton.textContent = 'Generate An Email';

              candidateCard.appendChild(emailButton);

              candidatesDiv.appendChild(candidateCard);
            });
          } else {
            var noCandidatesMsg = document.createElement('p');
            noCandidatesMsg.textContent =
              'No candidates available for this office.';
            candidatesDiv.appendChild(noCandidatesMsg);
          }

          resultsContainer.appendChild(button);
          resultsContainer.appendChild(candidatesDiv);
        });
      } else {
        resultsContainer.textContent = 'No contests found for this address.';
      }
    });
  document.getElementById('URL').textContent = apiUrl;
}
