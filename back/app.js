const express = require("express")
const app = express()
const axios = require("axios")
const cors = require("cors")

app.use(cors(
    //{
    //origin: ['http://127.0.0.1:5500/', 'https://google.es']
    //}
))

const url = "https://rickandmortyapi.com/api/character"

app.get("/characters", async (req,res) => 
    {
    try {
        const response = await axios.get(url);
        let data = []
        const totalPages = response.data.info.pages
        for (let i = 1; i <= totalPages; i++) {
            const responsePage = await axios.get(`${url}?page=${i}`)
            data.push(...responsePage.data.results)
        }
        
        res.json(data)
    } catch (err){ 
        res.status(500).json({error: `personaje no encontrado, ${err}`})
    }
})

app.get("/characters/:name", async (req,res) => {
    const name = req.params.name
    try { 
        const response = await axios.get(`${url}?name=${name}`)
        let data = []
        const totalPages = response.data.info.pages
        for (let i = 1; i <= totalPages; i++) {
            const responsePage = await axios.get(`${url}?name=${name}&page=${i}`)
            data.push(...responsePage.data.results)
        }
        const characterList = data.map(character => {
            const {name, status, gender, species, image, origin: {name: origin}} = character
            return {name, status, gender, species, image, origin}
        })
        res.json(characterList)
    } catch (err){ 
        res.status(500).json({error: `personaje no encontrado, ${err}`})

    }
})

app.listen(3000, () => {
    console.log("Express esta escuchando en el puerto http://localhost:3000")
})