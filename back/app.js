const express = require("express")
const app = express()
const axios = require("axios")
const cors = require("cors")

app.use(cors())

const url = "https://rickandmortyapi.com/api/character"

app.get("/characters", async (req,res) => {
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
        res.status(404).json({error: "personaje no encontrado"})
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
        res.json(data)
    } catch (err){ 
        res.status(404).json({error: "personaje no encontrado"})

    }
})

app.listen(3000, () => {
    console.log("Express esta escuchando en el puerto http://localhost:3000")
})