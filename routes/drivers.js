var express = require('express');
var router = express.Router();
const axios = require('axios');
const drivers_utils = require("./utils/drivers_utils");
const api_url = "http://ergast.com/api/f1" 

router.get("/", (req, res) => res.send("I'm here"));

/**
 * get all drivers by specific year
 */
router.get('/driversByYear', async (req, res, next) => {
    try {
        const year = req.query.year;
        // console.log(req.query)
        const response = await axios.get(`${api_url}/${year}/drivers.json?limit=1000`);
        const drivers = response.data.MRData.DriverTable.Drivers;
        let driversDetails = drivers_utils.extractDriversDetails(drivers);
        
        driversDetails =  await drivers_utils.insertPosition(driversDetails,year); 
        driversDetails = driversDetails.sort((a,b)=> a.position - b.position);
        
        res.send(driversDetails).status(200);
    } catch (error) {
        next(error);
    }
});

router.get('/allDrivers', async (req, res, next) => {
    try{
    const response = await drivers_utils.getAllDrivers();
    res.send(response).status(200);
    } catch (error) {
        next(error);
    }
    
})
router.get("/randomDrivers", async (req, res, next) => {
    try{
        const response = await drivers_utils.getAllDrivers();
        
        const drivers = response
        let randomDrivers = [];
        for (let i =0;i<3;i++){
        const randomNumber = Math.floor(Math.random() * drivers.length);
        const randomDriver = drivers[randomNumber];
        drivers.splice(randomNumber,1);
        randomDrivers.push(randomDriver);
        }
        
        res.send(randomDrivers).status(200);

    }
    catch(error){
        next(error);
    }
})

router.get("/searchDriver", async (req, res, next) => {

    try{
        const drivers = await drivers_utils.getAllDrivers();
        
        const name = req.query.name;   
        const driver = drivers.filter(d => {return d.givenName.toLowerCase() === name.toLowerCase() || d.driverId.toLowerCase() === name.toLowerCase() || d.familyName.toLowerCase() === name.toLowerCase() || d.givenName.toLowerCase()+d.familyName.toLowerCase() === name.toLowerCase() });
        if(driver){
            res.send(driver).status(200);
        }
        else{
            res.status(404).send("driver not found");
        }

    }catch(error){
        next(error);
    }
})

router.get("/driverStandingsByYear", async (req, res, next) => {
    try{
        const year = req.query.year;
        const response = await drivers_utils.getStandingsbyYear(year);
        // console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
        
        const drivers = response
        res.send(drivers).status(200);
    }catch(error){
        next(error);
    }

})
router.get('/driverInfo', async (req, res, next) => {
    try{
        const driverId = req.query.driverId;
        const data = await drivers_utils.getDriverFullInfo(driverId);
        res.send(data).status(200);
    }catch(error){
        next(error);
    }
})

module.exports = router;