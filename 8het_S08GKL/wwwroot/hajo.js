var questionID = 1
var joValasz;


window.onload = () => {
    kerdesBetoltes(1)
}
function kerdesBetoltes(id) {
    fetch(`/question/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kerdesMegjelenites(data));
}

function kerdesMegjelenites(kerdes) {
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
}

function kovetkezo() {
    console.log(questionID)
    questionID++;
    kerdesBetoltes(questionID);
}
function vissza() {
    if (questionID != 1) {
        questionID--;
        kerdesBetoltes(questionID)
    }
}

function valasz(id) {
    if (id != joValasz) {
        document.getElementById(`valasz${id}`).classList.add("rossz")
        document.getElementById()
    }
}