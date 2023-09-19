
const axios = require('axios');
const api_url = "http://ergast.com/api/f1" 
function extractDriversDetails(drivers) {
    let driversDetails = [];
    for (const driver of drivers) {
        const {driverId ,url, givenName,familyName,dateOfBirth,nationality} = driver;
        driversDetails.push({
            driverId:driverId 
            ,url:url
            , givenName:givenName
            ,familyName:familyName
            ,dateOfBirth:dateOfBirth
            ,nationality:nationality
        })
    }
    return driversDetails;
}
async function getAllDrivers(){
    const response = await axios.get(`${api_url}/drivers.json?limit=1000`);
    return response.data.MRData.DriverTable.Drivers;
}
async function insertPosition(drivers,year){
    let positions = await getStandingsbyYear(year);
    for (const driver of drivers) {
        
        const info = positions.find(element => element.Driver.driverId === driver.driverId)
        if (info === undefined){
            driver.position = "N/A";
            continue;
        }
        driver.position = info.position;
        driver.points = info.points;
        driver.constructor = info.Constructors[0];

    }
    return drivers;

}
async function getStandingsbyYear(year){
    const response = await axios.get(`${api_url}/${year}/driverStandings.json?limit=1000`);
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}
/**
 * 
 * @param {the unique driver name} driverId 
 * @returns an object with total for the driver, and an object with the data per year
 */
async function getDriverFullInfo(driverId){
    const response = await axios.get(`${api_url}/drivers/${driverId}/driverStandings.json?limit=1000`);
    let driverStandings = response.data.MRData.StandingsTable.StandingsLists;
    let totalPoints = 0;
    let totalWins = 0;
    let standingPerYear={};
    for (const standing of driverStandings) {
        totalPoints += Number(standing.DriverStandings[0].points);
        totalWins += Number(standing.DriverStandings[0].wins);
        standingPerYear[standing.season] = {position:standing.DriverStandings[0].position,points:standing.DriverStandings[0].points,wins:standing.DriverStandings[0].wins};
    }
    return {totalPoints:totalPoints,totalWins:totalWins,standingPerYear:standingPerYear};

}

exports.insertPosition = insertPosition;
exports.getStandingsbyYear = getStandingsbyYear;
exports.getAllDrivers = getAllDrivers;
exports.extractDriversDetails = extractDriversDetails;
exports.getDriverFullInfo = getDriverFullInfo;