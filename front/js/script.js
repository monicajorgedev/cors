
function getCharacterInfo(){
    const characterName = document.getElementById("characterName")
    const characterInfo = document.getElementById("characterInfo")

    const character = characterName.value.toLowerCase()

    if(!character) {
        alert("Introduce un personaje")
    }
    fetch(`http://localhost:3000/characters/${character}`)
    .then(response => response.json())
    .then(data => {
        characterInfo.innerHTML = ""
        data.forEach( data => {
            const template = `<div>
                <ul>
                <li>Name: ${data.name}</li>
                <li>Status:  ${data.status}</li>
                <li>Species: ${data.species}</li>
                <li>Gender: ${data.gender}</li>
                <li>Origin: ${data.origin.name}</li>
                </ul>
                <img src="${data.image}" alt="${data.name}"/>
                </div>` 
            characterInfo.innerHTML += template
    })
    })
    .catch (error => characterInfo.innerHTML = "<p> Imposible acceder al personaje</p>")
}

/*
try {
    const response = await fetch(`http://localhost:3000/characters/${character}`)
    const data = await response.json()
    characterInfo.innerHTML = ""
        data.map( character => {
             const {name, status, gender, species, image, origin} = character
             return
            const template = `<div>
                <ul>
                <li>Name: ${name}</li>
                <li>Status:  ${status}</li>
                <li>Species: ${species}</li>
                <li>Gender: ${gender}</li>
                <li>Origin: ${origin}</li>
                </ul>
                <img src="${image}" alt="${name}"/>
                </div>` 
            characterInfo.innerHTML += template

} catch (err) {
error => characterInfo.innerHTML = "<p> Imposible acceder al personaje</p>"
}
*/