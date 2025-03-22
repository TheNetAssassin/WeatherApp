require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require ("body-parser");
const https = require("https");
const $ = require("jquery");
const app = express();

// Using date method to get the current date.

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const d = new Date();
let day = days[d.getDay()];
const date = d.getDate();
var month = d.toLocaleString('default', { month: 'short' });
const year = d.getFullYear();



// Creating objects for storing values from openweathermap.org
let query="";
let btn = "off";

var weather = {
  city:"-",
  temp : "-",
  humidity : "-",
  wind : "-",
  desc : "-",
  pressure : "-",
  icon:"-"
};

var weeklist = {
  day1icon : "-",
  day1day:"-",
  day1temp:"-",
  day2icon : "-",
  day2day:"-",
  day2temp:"-", 
  day3icon : "-",
  day3day:"-",
  day3temp:"-", 
  day4icon : "-",
  day4day:"-",
  day4temp:"-"
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:"true"}));
app.set("view engine" , "ejs");

// Functions for getting weather details and defining unit

function weatherDetails(query,unit,res){
  
const url = "https://api.openweathermap.org/data/2.5/forecast?q="+ query + "&units="+ unit +"&appid="+process.env.APP_ID;

// Using npm native https module to get hold of weather data and storing the values in the objects we have created before.
https.get(url , (response) => {
  response.on("data" , (data)=>{
  const weatherData = JSON.parse(data);
  
   weather = {
    city:query,
    temp :weatherData.list[0].main.temp ,
    humidity :weatherData.list[0].main.humidity ,
    wind:weatherData.list[0].wind.speed ,
    desc:weatherData.list[0].weather[0].description,
    pressure:weatherData.list[0].main.pressure,
    icon:"https://openweathermap.org/img/wn/" + weatherData.list[0].weather[0].icon + "@2x.png" 
  };

  weeklist = {
         day1icon : "https://openweathermap.org/img/wn/" + weatherData.list[6].weather[0].icon + "@2x.png" ,
         day1day:days[new Date(weatherData.list[6].dt_txt).getDay()],
         day1temp:weatherData.list[6].main.temp,
         day2icon : "https://openweathermap.org/img/wn/" + weatherData.list[14].weather[0].icon + "@2x.png" ,       
         day2day:days[new Date(weatherData.list[14].dt_txt).getDay()],
         day2temp:weatherData.list[14].main.temp , 
         day3icon : "https://openweathermap.org/img/wn/" + weatherData.list[22].weather[0].icon + "@2x.png" ,
         day3day:days[new Date(weatherData.list[22].dt_txt).getDay()],
         day3temp:weatherData.list[22].main.temp , 
         day4icon : "https://openweathermap.org/img/wn/" + weatherData.list[30].weather[0].icon + "@2x.png" ,
         day4day:days[new Date(weatherData.list[30].dt_txt).getDay()],
         day4temp:weatherData.list[30].main.temp 
  };
  } , (err)=> {console.log("cannot retrieve data from open weather  map");
  });
  res.redirect("/");
});
}

function setUnit(){
  if(btn === "on") {
    return "imperial";
  } else {
    return "metric";
  }
}


// Get method
app.get("/" , (req,res)=>{

    const fulldate = date + " "  + month + " "  + year;    

  res.render("weather.ejs" , {day:day , fulldate:fulldate , weather:weather , weeklist:weeklist , btn:btn});
});

// post method when user submit a new location

app.post("/",(req,res)=>{

query = req.body.cityName;

const unit = setUnit();
weatherDetails(query,unit,res);

});

// Post method to change from Celsius to Farenheit

app.post("/unit" , (req,res)=>{

  btn = req.body.btn;

const unit = setUnit();
weatherDetails(query,unit,res);
});

app.listen(3000,()=> console.log("server started at port 3000"));