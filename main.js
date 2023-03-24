console.log("JS Connected")

const temp = document.querySelector(".temp")
const input = document.querySelector(".input")
const button = document.querySelector(".submitButton")
const mainBox = document.querySelector(".main")

button.addEventListener("click", function() {
  let search = input.value
  console.log(search);
  main(search)
})

async function main(location) {
  await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=d4df6784d59ea590c37296b1094eda06`, {mode: 'cors'})
  .then(function(response){
    return response.json()
  })
  .then(async function(response){
    let test = ""
    console.log(response)
    checkTemp(response[0].lat, response[0].lon);
    return "Valid"

  })
  .catch(function(err) {
    temp.innerText = "Error, Could not find Location. Please try again"
    input.value = ""
    
  })
  
}


async function checkTemp(lati, long) {
  let lat = lati
  let lon = long
  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4df6784d59ea590c37296b1094eda06&units=imperial`, {mode: 'cors'})
.then(function(response){
  return response.json();
})
.then(function(response){
  console.log(response);
  let name = response.name
  let cTemp = response.main.temp
  let mood = response.weather[0].description

  if (cTemp > 80 ) {
    mainBox.style.backgroundColor = "tomato";
  }
  else if (cTemp > 40) {
    mainBox.style.backgroundColor = "#A1737F";
  }
  else{
    mainBox.style.backgroundColor = "steelblue";
  }

  temp.innerText =  `The current tempature in ${name} is ${cTemp} degrees Fahrenheit. The weather is currently ${mood}`
  input.value = ""
}
)

.catch(function(err) {
  console.log(err);
  temp.innerText = "Error in API"
  input.value = ""
}
);

}


