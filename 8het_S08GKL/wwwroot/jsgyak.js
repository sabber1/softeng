window.onload = () => {
    doThepascal();
}
function faktoriális(num) {
    if (num < 0) {
        return -1
    }
    else if (num == 0) {
        return 1
    }
    else {
        return (num * faktoriális(num - 1));
    }
}

function doThepascal() {
    for (var sor = 0; sor < 10; sor++) {
        var sorDiv = document.createElement("div");
        sorDiv.className = "sor";
        document.getElementById("pascal").appendChild(sorDiv);

        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            var elemDiv = document.createElement("div")
            elemDiv.className = "elem"
            elemDiv.innerHTML = faktoriális(sor) / (faktoriális(oszlop) * faktoriális(sor - oszlop));
            sorDiv.appendChild(elemDiv)
        }
    }
}