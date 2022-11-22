var viccek;

window.onload = () => {
    fetch('/jokes.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data))
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés");
    console.log(d);
    viccek = d;

    for (var i = 0; i < viccek.length; i++) {
        var viccDiv = document.createElement("div");
        viccDiv.className = "vicc";

        var viccQuestion = document.createElement("p");
        viccQuestion.className = "q"
        viccQuestion.innerHTML = viccek[i].question;

        var viccAnswer = document.createElement("p");
        viccAnswer.className = "a"
        viccAnswer.innerHTML = viccek[i].answer;

        viccDiv.appendChild(viccQuestion);
        viccDiv.appendChild(viccAnswer);

        document.getElementById("jokes").appendChild(viccDiv);
    }
}