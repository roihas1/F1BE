var express = require('express');
var router = express.Router();
const axios = require('axios');
const circuits_utils = require("./utils/circuits_utils");



router.get("/", (req, res) => res.send("I'm here"));

router.get('/circuitsByYear/:year', async (req, res, next) => {
    try {
        const year = req.params.year;
        const response = await axios.get(`http://ergast.com/api/f1/${year}/circuits.json?limit=1000`);
        const circuits = response.data.MRData.CircuitTable.Circuits;
        const circuitsDetails = circuits_utils.extractCircuitsDetails(circuits);
        
        res.send(circuitsDetails).status(200);
    } catch (error) {
        next(error);
    }
});

router.get('/allCircuits', async (req, res, next) => {
    try{
        const response = await circuits_utils.getAllCircuits();
        const circuits = circuits_utils.extractCircuitsDetails(response.data.MRData.CircuitTable.Circuits);
        res.send(circuits).status(200);
    } catch (error) {
        next(error);
    }
    
})

router.get("/randomCircuits", async (req, res, next) => {
    try{
        const response = await axios.get(`http://ergast.com/api/f1/circuits.json?limit=1000`);
        const circuits = circuits_utils.extractCircuitsDetails(response.data.MRData.CircuitTable.Circuits);
        let randomCircuits = [];
        for (let i =0;i<3;i++){
        const randomNumber = Math.floor(Math.random() * circuits.length);
        const randomCircuit = circuits[randomNumber];
        circuits.splice(randomNumber,1);
        randomCircuits.push(randomCircuit);
        }
        console.log(randomCircuits);
        res.send(randomCircuits).status(200);

    }
    catch(error){
        next(error);
    }

})





module.exports = router;