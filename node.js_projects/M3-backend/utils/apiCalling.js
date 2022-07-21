const schedule = require("node-schedule");
const axios = require("axios");


const cityCodes = [
  { city: "sharaqpur",  weatherCode: 260444,},
  { city: "Nankana Sahib", weatherCode: 260168 },
  { city: "Jaranwala", weatherCode: 260488 },
  { city: "Sammundri", weatherCode: 259758 },
  { city: "Rajana", weatherCode: 260220 },
  { city: "Pir Mahal", weatherCode: 260210 },
];

const apiKey = process.env.Accu_API_Key
console.log("thi sis my own variable " )
console.log(apiKey)
console.log("this is proces.env.Accu_API_Key")
console.log( process.env.Accu_API_Key)

const requestAccuWe = () => {
  schedule.scheduleJob("apiCalling", "1 1 */1 * * *", () => {
    console.log("scheduled after every some seconds");
    console.log(
      new Date().toLocaleString({ weekday: "long" }).replace(",", "")
    );
    // call the api and store it in db, call a route to add in db
  });
  console.log("running requestAccuWe()");
  sendRequest();
};

const sendRequest = () => {
  console.log("running axios function");
  console.log(`${process.env.API_URL}${cityCodes[0]}?apikey=${process.env.Accu_API_Key}&details=true`)
  axios
    .get(
      "https://dataservice.accuweather.com/currentconditions/v1/259758?apikey=Pq1CAvbAzz7IWR7DADMzG0c22nGXrGzh&details=true"
    )
    .then( (res) => {
      var str = JSON.stringify(res.data, null, 4);
      //  console.log(str);
    })
    .catch(async (error) => {

      console.log('an error is being encountered in weather api axios request'.red)
      await console.error(error.response.data.Code);
      if(error.response.data.Code == "ServiceUnavailable"){
        console.log('entering first if')
        console.log(apiKey)
        if(apiKey === process.env.Accu_API_Key){
          console.log("Error in APIkey of Manah , assigning API key of Ham".bgred)
        }


      }

      // console.error(error.data.Message);
      // console.error("and teh code is ");
      // console.error(error.data.Code);

    });
};

module.exports = requestAccuWe;
