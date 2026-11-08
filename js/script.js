document.querySelector("button").addEventListener("click", gradeQuiz);
// Q9 slider event listener
document.querySelector("#q9").addEventListener("input", function () {
    document.querySelector("#q9Value").textContent = this.value;
});


let score = 0;

// Load initial total attempts from localStorage
let attempts = localStorage.getItem("total_attempts");
if (attempts === null) {
    attempts = 0;
} else {
    attempts = Number(attempts);
}

// Display randomized choices for Q4 and Q8 on page load
displayQ4Choices();
displayQ8Choices();


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    shuffleArray(q4ChoicesArray);

    let choicesContainer = document.querySelector("#q4Choices");
    choicesContainer.textContent = "";

    for (let choice of q4ChoicesArray) {
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "q4";
        input.id = choice;
        input.value = choice;

        let label = document.createElement("label");
        label.htmlFor = choice;
        label.textContent = choice;

        let wrapper = document.createElement("div");
        wrapper.className = "form-check";
        input.className = "form-check-input";
        label.className = "form-check-label";

        wrapper.appendChild(input);
        wrapper.appendChild(label);
        choicesContainer.appendChild(wrapper);

    }
}

// Display randomized choices for Q8 on page load
function displayQ8Choices() {
    let q8ChoicesArray = ["Arizona", "Nevada", "Utah", "Colorado"];
    shuffleArray(q8ChoicesArray);

    let choicesContainer = document.querySelector("#q8Choices");
    choicesContainer.textContent = "";

    for (let choice of q8ChoicesArray) {
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "q8";
        input.id = "q8" + choice;
        input.value = choice;

        let label = document.createElement("label");
        label.htmlFor = "q8" + choice;
        label.textContent = choice;

        let wrapper = document.createElement("div");
        wrapper.className = "form-check";
        input.className = "form-check-input";
        label.className = "form-check-label";

        wrapper.appendChild(input);
        wrapper.appendChild(label);
        choicesContainer.appendChild(wrapper);

    }
}


function setMarkImage(index, imageName, altText) {
    let markContainer = document.querySelector(`#markImg${index}`);
    markContainer.textContent = "";

    let img = document.createElement("img");
    img.src = `img/${imageName}`;
    img.alt = altText;
    img.width = 50;
    markContainer.appendChild(img);
}

function rightAnswer(index, points = 10) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Correct!";
    feedback.className = "bg-success text-white";
    setMarkImage(index, "checkmark.png", "Checkmark");
    score += points;
}

function wrongAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Incorrect!";
    feedback.className = "bg-warning text-white";
    setMarkImage(index, "xmark.png", "X mark");
}

function isFormValid() {
    let isValid = true;
    let q1Response = document.querySelector("#q1").value;
    let validationFdbk = document.querySelector("#validationFdbk");

    if (q1Response === "") {
        isValid = false;
        validationFdbk.textContent = "Question 1 was not answered";
    }

    return isValid;
}

function gradeQuiz() {
    document.querySelector("#validationFdbk").textContent = "";

    if (!isFormValid()) {
        return;
    }

    score = 0;

    // Question 1
    let q1Response = document.querySelector("#q1").value.toLowerCase().trim();
    if (q1Response === "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    // Question 2
    let q2Response = document.querySelector("#q2").value;
    if (q2Response === "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    // Question 3
    if (document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    // Question 4
    let selectedQ4 = document.querySelector("input[name=q4]:checked");
    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    // Question 5
    let q5Response = Number(document.querySelector("#q5").value);
    if (q5Response === 50) {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    // Question 6
    let q6Response = document.querySelector("#q6").value.toLowerCase().trim();
    if (["alaska", "washington", "idaho", "montana", "north dakota", "minnesota", "michigan", "new york", "vermont", "new hampshire", "maine"]
        .includes(q6Response)) {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    // Question 7
    if (document.querySelector("#superior").checked &&
        document.querySelector("#erie").checked &&
        !document.querySelector("#tahoe").checked &&
        !document.querySelector("#okeechobee").checked) {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    // Question 8
    let selectedQ8 = document.querySelector("input[name=q8]:checked");
    if (selectedQ8 !== null && selectedQ8.value === "Arizona") {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    // Question 9
    let q9Response = Number(document.querySelector("#q9").value);
    if (q9Response === 1959) {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    // Question 10
    let q10Response = document.querySelector("#q10").value.toLowerCase().trim();
    if (["west virginia", "wv"].includes(q10Response)) {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    // Question 11 (bonus, worth 0)
    let q11Response = document.querySelector("#q11").value.toLowerCase().trim();
    if (["spain", "españa"].includes(q11Response)) {
        rightAnswer(11, 0);
    } else {
        wrongAnswer(11);
    }





    // Display score with conditional styling
    let scoreElement = document.querySelector("#totalScore");
    scoreElement.textContent = `Total Score: ${score}`;

    let congratsElement = document.querySelector("#congrats");
    if (score > 80) {
        scoreElement.className = "h4 text-success";

        congratsElement.textContent = "Congratulations! You scored above 80 points!";
    } else {
        scoreElement.className = "h4 text-danger";

        congratsElement.textContent = "";
    }

    // Update total attempts & save to localStorage
    attempts++;
    document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
    localStorage.setItem("total_attempts", attempts);
}