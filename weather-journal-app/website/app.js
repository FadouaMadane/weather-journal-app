// NICE TO MEET YOU THANKS FOR REVIEWING MY CODE
/* Global Variables */
//The personal API Key for OpenWeatherMap API is saved in a named const variable appkey .
const appkey = '&appid=963073f85381cc46e5fe8e5394c766e1'
const baseURLApi = 'http://api.openweathermap.org/data/2.5/weather?zip='
const userInput = document.getElementById('feelings')

// for testing morroco zipcode 47963
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
//API credentials on OpenWeatherMap.com   email: devfadoua@hotmail.com   pass: FGua******
//Add eventListener too ur button  generate
document.getElementById('generate').addEventListener('click', performAction);
// callback function
function performAction(e) {
    const newZip = document.getElementById('zip').value;
    getWeather(baseURLApi, newZip, appkey)
        .then(function(data) {
            // load all information from api weather
            console.log(data);
            // load the temperature as kelvin 
            console.log('temperature : ' + data.main.temp);
            // load the name of city 
            console.log('the name of city : ' + data.name);
            // get the user input 
            console.log('the feeling : ' + userInput.value);
            // load the data
            console.log('the date is  : ' + newDate);
            document.getElementById('generate').textContent = 'loading ...';
            document.getElementById('generate').setAttribute('style', 'background-color:coral;color:black;');
            // post the data to the server
            postData('/addWeather', {
                temp: data.main.temp,
                dt: newDate,
                feel: userInput.value
            }).then(
                //update the UI interface
                updateUI()
            )
        });
}


// fetch Url to get all information weather about zip country
const getWeather = async(baseURLApi, newZip, appkey) => {

    const res = await fetch(baseURLApi + newZip + appkey)
    try {

        const data = await res.json();
        console.log('data inside the function ' + data);
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

// postData  to the server  
const postData = async(url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}

// Update UI interface with the new data 
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        // update the temperture  we substract - 273 to convert to celicuis 
        let s = 'C°';
        document.getElementById('temp').innerHTML = Math.floor(allData.temp - 273) + " " + s;
        // update the date
        document.getElementById('date').innerHTML = "the date : " + allData.dt;
        // update the feeling of user
        document.getElementById('content').innerHTML = "he / she feel : " + allData.feel;

    } catch (error) {
        console.log("error", error);
    }
}