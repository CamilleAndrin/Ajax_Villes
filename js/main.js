
let cityName = null;
let cp = null;
let cpValue;

function getCp(){
    cpValue = cp.value;
    if(cpValue.length > 2){
        getData();
    }
}

function getData() {
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            console.log(data);
            cityName.options.length = 0;
            getCityName(data);
        }
    }
    xhr.open("GET", `villes.php?cp=${cpValue}`, true);
    xhr.send(null);
}

function getCityName(data){
    data.forEach(function(ville) {
    let newOption = document.createElement("option")
    newOption.value = ville.ville_id;
    newOption.innerText = ville.ville_nom_reel;
    cityName.appendChild(newOption)       
   });
}

document.addEventListener("DOMContentLoaded", function() {
    cityName = document.getElementById('ville')
    cp = document.getElementById('cp');
    cp.addEventListener('keyup', getCp);    
});