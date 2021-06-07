var triviaQuestionLabel = document.getElementById("trivia-question");

var simpsonsQuestions = {
    "What is the first name of Mr. Burns' assistant, Mr. Smithers?": "914384f6e16c53803aacef2408818576",
    "Complete this quote: A noble spirit _________ the smallest man.": "1b5177b6a329391bb613825617f8a304",
    "What is the name of Springfield's neighbouring rival town?": "ffaadf364c486d867eca3616d32b2e08",
    "What is the Simpsons' house number on Evergreen Terrace?": "e94550c93cd70fe748e6982b3439ad3b",
    "What is Homer's mother's first name?": "4af5cab77c62eaec5f87b570f2d2b127"
};

var randomQuestion = randomKey(simpsonsQuestions);

triviaQuestionLabel.textContent = randomQuestion;

function randomKey(obj) {
    var ret;
    var c = 0;
    for (var key in obj)
        if (Math.random() < 1/++c) {
           ret = key;
        }
    return ret;
}

function resubmitForm() {
    var submit = document.getElementById("btn-submit");
    submit.click();
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

var form = document.getElementById("contact-form");

async function handleSubmit(event) {
    event.preventDefault();

    var failure = document.getElementById("form-failure");
    var submit = document.getElementById("btn-submit");

    // Check the bonus question answer
    var userAnswer = document.getElementById("trivia").value;
    var priority = simpsonsQuestions[randomQuestion] == md5(userAnswer.toLowerCase())

    var data = new FormData(event.target);
    data.append("_priority", priority ? "high" : "medium");

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(handleErrors)
    .then(response => {
        submit.style.display = "none";
        failure.style.display = "none";

        var success = document.getElementById("form-success");
        success.style.display = "flex";

        form.reset()
    })
    .catch(error => {
        submit.style.display = "none";
        failure.style.display = "flex";
    });
}

var resubmitLink = document.getElementById("link-resubmit");
resubmitLink && resubmitLink.addEventListener("click", resubmitForm);
document.addEventListener("submit", handleSubmit);