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
    const draftElement = document.querySelector(".body");
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
            policyText.textContent = "What is your stance on international relations, including our nation’s alliances? What approach do you support regarding military spending and veterans' services? How would you address nuclear and cybersecurity threats?"
            break;
    }
    draftElement.appendChild(policyText);
}

getModal()