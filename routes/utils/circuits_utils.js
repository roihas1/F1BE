

function extractCircuitsDetails(circuits){
    let circuits_details = [];
    for (const circuit of circuits) {
        const {circuitId ,url, circuitName,Location} = circuit;
        circuits_details.push({
            circuitId:circuitId,
            url:url,
            circuitName:circuitName,
            city:Location.locality,
            country:Location.country
        })
    }
    return circuits_details;
}
async function getAllCircuits(){
    const response = await axios.get(`${api_url}/circuits.json?limit=1000`);
    return response.data.MRData.CircuitTable.Circuits;
}

exports.getAllCircuits = getAllCircuits;
exports.extractCircuitsDetails = extractCircuitsDetails;

