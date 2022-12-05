var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;

var questionID = 1
var joValasz;

var timeoutHandler;


/// GET QUESTION COUNT-nál tartok

window.onload = () => {
    init();
}
function init() {
    if (!localStorage.getItem("hotList")) {
        console.log("Hot List coldStart");

        for (var i = 0; i < questionsInHotList; i++) {
            let q = {
                "question": {},
                "goodAnswers": 0
            }
            hotList[i] = q;
        }

        // Első adag letöltése
        for (var i = 0; i < questionsInHotList; i++) {
            kerdesBetoltes(nextQuestion, i);
            nextQuestion++;
        }
    } else {
        hotList = JSON.parse(localStorage.getItem("hotList"));
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
        displayedQuestion = 0;
        console.log("Hot List found");
        kerdesMegjelenites();
    }

    // Fetching length of database
    fetch('questions/count')
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás kapcsolat: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .then(data => {
            numberOfQuestions = data;
            console.log(data)
        });
}


function kerdesBetoltes(id, destination) {

    if (id > numberOfQuestions) {
        console.warn("Out of questions!");
        return;
    }

    fetch(`/question/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(q => {
            console.log(q)
            hotList[destination].question = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${id} kérdés betöltve a hot list ${destination}-ra`);
            if (displayedQuestion == undefined && destination == 0) {
                displayedQuestion = 0;
                kerdesMegjelenites();
            }
        }
        );
}

function kerdesMegjelenites() {
    let kerdes = hotList[displayedQuestion].question;
    if (!kerdes) return;
    console.log(kerdes)

    joValasz = kerdes.correctAnswer;

    document.getElementById("kerdes_szoveg").innerHTML = kerdes.question1;
    document.getElementById("valasz1").innerHTML = kerdes.answer1;
    document.getElementById("valasz2").innerHTML = kerdes.answer2;
    document.getElementById("valasz3").innerHTML = kerdes.answer3;
    console.log("https://szoft1.comeback.hu/hajo/" + kerdes.image)

    if (kerdes.image) {
        document.getElementById("kep1").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;
        document.getElementById("kep1").classList.remove("rejtett");
    }
    else {
        document.getElementById("kep1").classList.add("rejtett")
    }

    document.getElementById("valasz1").classList.remove("jo", "rossz");
    document.getElementById("valasz2").classList.remove("jo", "rossz");
    document.getElementById("valasz3").classList.remove("jo", "rossz");

    document.getElementById("valasz1").style.pointerEvents = "auto";
    document.getElementById("valasz2").style.pointerEvents = "auto";
    document.getElementById("valasz3").style.pointerEvents = "auto";
}

function kovetkezo() {
    console.log(displayedQuestion)
    // Clearing timeout handler
    clearTimeout(timeoutHandler);

    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kerdesMegjelenites();
}
function vissza() {
    displayedQuestion--;
    if (displayedQuestion <= -1) displayedQuestion = 0;
    kerdesMegjelenites();
}

function valasz(id) {
    if (id != joValasz) { // Wrong answer
        document.getElementById(`valasz${id}`).classList.add("rossz")
        document.getElementById(`valasz${joValasz}`).classList.add("jo")
        hotList[displayedQuestion].goodAnswers = 0;
    } else { // Good answer
        document.getElementById(`valasz${id}`).classList.add("jo")
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers >= 3) { // 3 good answers
            console.log(`${displayedQuestion} elérte a 3 jó választ`)
            kerdesBetoltes(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }

    // Make buttons unclickable
    document.getElementById("valasz1").style.pointerEvents = "none";
    document.getElementById("valasz2").style.pointerEvents = "none";
    document.getElementById("valasz3").style.pointerEvents = "none";

    // Save current state
    mentes();

    // Start timeout handler
    timeoutHandler = setTimeout(kovetkezo, 3000);
}

function mentes() {
    console.log("Saving..")
    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("nextQuestion", nextQuestion);
}