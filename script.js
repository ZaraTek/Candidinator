var city = '';
var state = '';
var google_API_key = 'YOUR-API-KEY';
var openAI_API_key = 'OPENAI-API-KEY';


function loadCandidateImage(candidateName, imgElement, google_API_key) {
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${google_API_key}&cx=657690a897580469f&q=${encodeURIComponent(candidateName)}&searchType=image`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const imageUrls = data.items.map(item => item.link);
        findValidImage(imageUrls, imgElement);
      } else {
        console.error('No images found for candidate:', candidateName);
      }
    })
    .catch(error => {
      console.error('Error fetching image:', error);
    });
}

function findValidImage(imageUrls, imgElement) {
  if (imageUrls.length === 0) {
    console.error('No valid images found.');
    return;
  }

  const currentUrl = imageUrls.shift();
  const testImage = new Image();

  testImage.onload = function() {
    imgElement.src = currentUrl;
  };

  testImage.onerror = function() {
    findValidImage(imageUrls, imgElement);
  };

  testImage.src = currentUrl;
}



function submitAddress() {
  document.getElementById("ballot").style.display="flex";
  const address = document.getElementById('address').value;
  city = document.getElementById('city').value;
  state = document.getElementById('state').value;
  const zipCode = document.getElementById('zipCode').value;

  const combinedAddress = `${address}, ${city}, ${state}, ${zipCode}, United States`;
  const apiUrl = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${encodeURIComponent(combinedAddress)}&key=${google_API_key}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const resultsContainer = document.getElementById('ballot');
      resultsContainer.innerHTML = '';

      if (data.contests && data.contests.length > 0) {
        data.contests.forEach(contest => {
          const office = contest.office;
          const button = document.createElement('button');
          button.classList.add("position-button");
          const dropdownInnerContainer = document.createElement('div');
          dropdownInnerContainer.classList.add('dropdown-inner-container');

          const span = document.createElement('span');
          span.textContent = office;

          var svg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
          );
          svg.setAttribute('width', '10');
          svg.setAttribute('height', '10');
          svg.setAttribute('viewBox', '0 0 10 10');

          var path = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
          );
          path.setAttribute('d', 'M1 3 L5 7 L9 3');
          path.setAttribute('stroke', 'black');
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('fill', 'none');

          svg.appendChild(path);

          dropdownInnerContainer.appendChild(span);
          dropdownInnerContainer.appendChild(svg);

          button.appendChild(dropdownInnerContainer);

          const candidatesDiv = document.createElement('div');
          candidatesDiv.classList.add('candidates');
          candidatesDiv.style.display = 'none';

          button.addEventListener('click', () => {
            candidatesDiv.style.display = candidatesDiv.style.display === 'none' ? 'block' : 'none';
          });

          if (contest.candidates && contest.candidates.length > 0) {
            contest.candidates.forEach(candidate => {
              const candidateCard = document.createElement('div');
              candidateCard.classList.add('candidate-card');

              const candidateContainer = document.createElement('div');
              candidateContainer.classList.add('candidate-container');

              const img = document.createElement('img');
              img.classList.add('candidate-image')
              img.setAttribute('height', '80px');
              img.setAttribute('width', '80px');
              img.setAttribute('src', 'https://via.placeholder.com/80');
              img.setAttribute('alt', 'candidate-image');

              // Load the actual candidate image from the API
              loadCandidateImage(candidate.name, img, google_API_key);

              const candidateInfo = document.createElement('div');
              candidateInfo.classList.add('candidate-info');

              const candidateNameSpan = document.createElement('span');
              candidateNameSpan.textContent = candidate.name;

              const candidateDetailsDiv = document.createElement('div');
              candidateDetailsDiv.classList.add('candidate-details');

              const candidatePartySpan = document.createElement('span');
              candidatePartySpan.textContent = candidate.party || 'No Party Info';

              candidateDetailsDiv.appendChild(candidatePartySpan);
              candidateInfo.appendChild(candidateNameSpan);
              candidateInfo.appendChild(candidateDetailsDiv);

              candidateContainer.appendChild(img);
              candidateContainer.appendChild(candidateInfo);
              candidateCard.appendChild(candidateContainer);

              const emailButton = document.createElement('button');
              emailButton.setAttribute('onclick', `generateEmail('${candidate.name}')`);
              emailButton.textContent = 'Generate An Email';

              candidateCard.appendChild(emailButton);
              candidatesDiv.appendChild(candidateCard);
            });
          } else {
            const noCandidatesMsg = document.createElement('p');
            noCandidatesMsg.textContent = 'No candidates available for this office.';
            candidatesDiv.appendChild(noCandidatesMsg);
          }

          resultsContainer.appendChild(button);
          resultsContainer.appendChild(candidatesDiv);
        });
      } else {
        resultsContainer.textContent = 'No contests found for this address.';
      }
    });
}

function copyToClipBoard() {
  const emailContent = document.querySelector(".content-wrapper").innerText;

  const yourName = document.getElementById("your_name").value;

  const fullContent = `${emailContent}${yourName}`;

  navigator.clipboard.writeText(fullContent).then(() => {
      alert("Email copied to clipboard!");
  }).catch(err => {
      console.error('Failed to copy text: ', err);
  });
}

function clearPolicies() {
  document.getElementById("policies").innerHTML='';
}

function getModal() {
  var modal = document.getElementById("policyModal");
  var btn = document.getElementById("addPolicy");

  var span = document.getElementsByClassName("close")[0];

  // open modal onclick
  btn.onclick = function(event) {
      modal.style.display = "block";
  }

  // close modal on span
  span.onclick = function() {
      modal.style.display = "none";
  }

  // when the user clicks outside, close
  window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
  }

  // add event listeners for each policy button
  document.querySelectorAll(".policy-button").forEach(button => {
      button.onclick = function(event) {
          const policy = button.getAttribute("data-policy");
          addPolicyToDraft(policy);
          modal.style.display = "none";  // close the modal after selecting a policy
      };
  });
}

function addPolicyToDraft(policy) {
  const draftElement = document.getElementById("policies");
  const policyText = document.createElement("p");

  switch (policy) {
    case "Healthcare":
      policyText.textContent = "What policies do you have in mind to make healthcare accessible and affordable? What is your stance on Medicare and Medicaid? Do you have any proposals for funding mental health services?"
      break;
    case "Education":
      policyText.textContent = "What are your plans for funding public schools and supporting teachers? Where do you stand on school choice and charter schools? Do you have any proposals to address the rising costs of higher education and student loan debt?"
      break;
    case "Economy and Jobs":
      policyText.textContent = "What is your stance on minimum wage policies? Do you have plans to support job creation and local small businesses? How do you plan to protect workers' rights and improve labor conditions?"
      break;
    case "Environment and Climate Change":
      policyText.textContent = "What initiatives do you support to promote sustainability and green energy? How would you address carbon emissions and pollution? What are your plans to conserve natural resources and protect public lands?"
      break;
    case "Gun Control and Public Safety":
      policyText.textContent = "What are your views on gun permits and background check policies? How do you plan to address community safety, including police reform? What measures would you support to prevent crime and improve the justice system?"
      break;
    case "Immigration":
      policyText.textContent = "What reforms do you support regarding immigration policies and border security? How would you assist immigrants within our community? What is your stance on issues affecting undocumented individuals and programs like DACA?"
      break;
    case "Civil Rights and Social Justice":
      policyText.textContent = "What are your thoughts on protecting voting rights and ensuring election security? How would you work to advance LGBTQ+ rights and other protections? What is your approach to criminal justice reform and addressing racial equity?"
      break;
    case "Reproductive Rights":
      policyText.textContent = "What is your position on access to abortion and other reproductive health services? How would you address policies regarding birth control and family planning? What steps would you take to improve maternal healthcare and promote healthcare equity?"
      break;
    case "Housing and Homelessness":
      policyText.textContent = "What are your plans for making housing more affordable? How would you address homelessness in our community? Do you support rent control measures or enhanced tenant rights?"
      break;
    case "Technology and Privacy":
      policyText.textContent = "What policies do you propose to protect data privacy and cybersecurity? How do you view the regulation of social media and major tech companies? What are your plans to improve internet access and digital infrastructure?"
      break;
    case "Infrastructure":
      policyText.textContent = "How would you prioritize funding for roads, public transportation, and other infrastructure needs? What plans do you have for investing in water, sewer, and energy systems? How would you prepare for and respond to natural disasters?"
      break;
    case "Foreign Policy and Defense":
      policyText.textContent = "What is your stance on international relations, including our nation's alliances? What approach do you support regarding military spending and veterans' services? How would you address nuclear and cybersecurity threats?"
      break;
    case "Custom Issue":
      openAIModal();
      break;
  }
  draftElement.appendChild(policyText);
}

getModal()

function generateEmail(name) {
  document.getElementById('email-generator').style.display = "flex";
  document.getElementById('candidate').innerHTML = name;
  document.getElementById('location').innerHTML = city + ", " + state;
}

function closeModal() {
  document.getElementById('email-generator').style.display = "none";
}

function openAIModal() {
  document.getElementById('ai-modal').style.display = "flex";
}

function closeAIModal() {
  document.getElementById('ai-modal').style.display = "none";
  document.getElementById('ai-text').innerHTML = "";
  document.querySelector('.add-email-button').style.display = "none";
  document.getElementById('custom-issue').value = "";
  const aiButton = document.getElementById("generate-ai-button");
  aiButton.innerHTML = `Generate with AI
            <svg width="18" height="16" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4C5.82843 3.17157 6 2 6 2C6 2 6.17157 3.17157 7 4C7.82843 4.82843 9 5 9 5C9 5 7.82843 5.17157 7 6C6.17157 6.82843 6 8 6 8C6 8 5.82843 6.82843 5 6C4.17157 5.17157 3 5 3 5C3 5 4.17157 4.82843 5 4Z" fill="white"/>
                <path d="M3.66667 0.666667C3.94281 0.390524 4 0 4 0C4 0 4.05719 0.390524 4.33333 0.666667C4.60948 0.942809 5 1 5 1C5 1 4.60948 1.05719 4.33333 1.33333C4.05719 1.60948 4 2 4 2C4 2 3.94281 1.60948 3.66667 1.33333C3.39052 1.05719 3 1 3 1C3 1 3.39052 0.942809 3.66667 0.666667Z" fill="white"/>
                <path d="M1.33333 2.33333C1.88562 1.78105 2 1 2 1C2 1 2.11438 1.78105 2.66667 2.33333C3.21895 2.88562 4 3 4 3C4 3 3.21895 3.11438 2.66667 3.66667C2.11438 4.21895 2 5 2 5C2 5 1.88562 4.21895 1.33333 3.66667C0.781049 3.11438 0 3 0 3C0 3 0.781049 2.88562 1.33333 2.33333Z" fill="white"/>
            </svg>`;
}

async function generateAI() {
  const customIssue = document.getElementById("custom-issue").value;
  const aiButton = document.getElementById("generate-ai-button");
  aiButton.innerHTML = "Loading...";

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAI_API_key}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: 'You are a helpful AI Assistant' },
          { role: "user", content: `Without any introductory or concluding phrases (or the dear [candidate name] and sincerely [your name]), generate only a paragraph similar to the following paragraphs on the specific issue of "${customIssue}": Dear [candidate_name],

I am a citizen who will be voting in the upcoming election. I had a few questions about your stances and proposed policies on the following issues:

1. Healthcare
What policies do you have in mind to make healthcare accessible and affordable? What is your stance on Medicare and Medicaid? Do you have any proposals for funding mental health services?

2. Education
What are your plans for funding public schools and supporting teachers? Where do you stand on school choice and charter schools? Do you have any proposals to address the rising costs of higher education and student loan debt?

3. Economy and Jobs
What is your stance on minimum wage policies? Do you have plans to support job creation and local small businesses? How do you plan to protect workers' rights and improve labor conditions?

4. Environment and Climate Change
What initiatives do you support to promote sustainability and green energy? How would you address carbon emissions and pollution? What are your plans to conserve natural resources and protect public lands?

5. Gun Control and Public Safety
What are your views on gun permits and background check policies? How do you plan to address community safety, including police reform? What measures would you support to prevent crime and improve the justice system?

6. Immigration
What reforms do you support regarding immigration policies and border security? How would you assist immigrants within our community? What is your stance on issues affecting undocumented individuals and programs like DACA?

7. Civil Rights and Social Justice
What are your thoughts on protecting voting rights and ensuring election security? How would you work to advance LGBTQ+ rights and other protections? What is your approach to criminal justice reform and addressing racial equity?

8. Reproductive Rights
What is your position on access to abortion and other reproductive health services? How would you address policies regarding birth control and family planning? What steps would you take to improve maternal healthcare and promote healthcare equity?

9. Housing and Homelessness
What are your plans for making housing more affordable? How would you address homelessness in our community? Do you support rent control measures or enhanced tenant rights?

10. Technology and Privacy
What policies do you propose to protect data privacy and cybersecurity? How do you view the regulation of social media and major tech companies? What are your plans to improve internet access and digital infrastructure?

11. Infrastructure
How would you prioritize funding for roads, public transportation, and other infrastructure needs? What plans do you have for investing in water, sewer, and energy systems? How would you prepare for and respond to natural disasters?

12. Foreign Policy and Defense
What is your stance on international relations, including our nation’s alliances? What approach do you support regarding military spending and veterans' services? How would you address nuclear and cybersecurity threats?

Sincerely,
[your name]' ` }
              ]
          })
      });


  const aiResponse = document.getElementById("ai-text");
  const data = await response.json();
  aiResponse.innerHTML = data.choices[0].message.content;
  aiButton.innerHTML = `Generate Again
            <svg width="18" height="16" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4C5.82843 3.17157 6 2 6 2C6 2 6.17157 3.17157 7 4C7.82843 4.82843 9 5 9 5C9 5 7.82843 5.17157 7 6C6.17157 6.82843 6 8 6 8C6 8 5.82843 6.82843 5 6C4.17157 5.17157 3 5 3 5C3 5 4.17157 4.82843 5 4Z" fill="white"/>
                <path d="M3.66667 0.666667C3.94281 0.390524 4 0 4 0C4 0 4.05719 0.390524 4.33333 0.666667C4.60948 0.942809 5 1 5 1C5 1 4.60948 1.05719 4.33333 1.33333C4.05719 1.60948 4 2 4 2C4 2 3.94281 1.60948 3.66667 1.33333C3.39052 1.05719 3 1 3 1C3 1 3.39052 0.942809 3.66667 0.666667Z" fill="white"/>
                <path d="M1.33333 2.33333C1.88562 1.78105 2 1 2 1C2 1 2.11438 1.78105 2.66667 2.33333C3.21895 2.88562 4 3 4 3C4 3 3.21895 3.11438 2.66667 3.66667C2.11438 4.21895 2 5 2 5C2 5 1.88562 4.21895 1.33333 3.66667C0.781049 3.11438 0 3 0 3C0 3 0.781049 2.88562 1.33333 2.33333Z" fill="white"/>
            </svg>`;
  document.querySelector(".add-email-button").style.display="block";

  } catch (error) {
  aiResponse.innerHTML = `<strong>Error:</strong> ${error.message}`;
  }
}

function addToEmail() {
  const draftElement = document.getElementById("policies");
  const policyText = document.createElement("p");
  policyText.textContent = document.getElementById("ai-text").innerHTML;
  draftElement.appendChild(policyText);
  closeAIModal();
}

window.onclick = function(event) {
  if (event.target == document.getElementById('email-generator')) {
    document.getElementById('email-generator').style.display = "none";
  }
}

document.getElementsByClassName("closeOtherModal").onclick = function() {
  document.getElementById('email-generator').style.display = "none";
}
