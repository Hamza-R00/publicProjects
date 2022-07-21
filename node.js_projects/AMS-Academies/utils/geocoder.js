const NodeGeocoder  = require("node-geocoder");
const ck = require("ckey");


const  gk = ck.GEOCODER_API_KEY;
const gp = ck.GEOCODER_PROVIDER;
const options = {
    provider: gp ,
    apiKey: gk,
    formatter:null,
}

const geocoder = NodeGeocoder(options)



module.exports = geocoder;