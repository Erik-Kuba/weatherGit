const apiKey = "96b98ba93246419b8da174841240711";
let city = "Berlin";
const call = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

let arrWeek = [];

const getWeather = async () => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
  );
  const date = await response.json();
  console.log(date);
  displayInfoAboutWeather(
    date.location.localtime,
    date.location.name,
    date.current.temp_c,
    date.current.condition.text,
    date.current.condition.icon
  );
};
getWeather();
function displayInfoAboutWeather(localtime, name, temp_c, text, icon) {
  const cityContext = document.querySelector(".city-text");
  cityContext.textContent = name;
  const tempContent = document.querySelector(".temperature-now-text");
  tempContent.textContent = temp_c;
  const dataContent = document.querySelector("#today");
  dataContent.textContent = localtime;
  const iconContent = document.querySelector("#firstIcon");
  iconContent.src = icon;
  const conditionContent = document.querySelector("#weather");
  conditionContent.textContent = text;
}

const getWeekWeather = async () => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`
  );
  const date = await response.json();
  //console.log(date);

  const dateArr = date.forecast.forecastday.map((element) => element.date);
  const maxTemp = date.forecast.forecastday.map(
    (element) => element.day.maxtemp_c
  );
  const minTemp = date.forecast.forecastday.map(
    (element) => element.day.mintemp_c
  );
  const icon = date.forecast.forecastday.map(
    (element) => element.day.condition.icon
  );

  displayInfoAboutWeekWeather(dateArr, maxTemp, minTemp, icon);
};
getWeekWeather();

function displayInfoAboutWeekWeather(date, maxtemp_c, mintemp_c, icon) {
  const maxTempWeek = document.querySelectorAll(".temperature-max-text");
  maxTempWeek.forEach((e, index) => {
    if (index < maxtemp_c.length) {
      e.textContent = maxtemp_c[index+1];
    }
    console.log(maxTempWeek[1]);
  });

  const iconWeek = document.querySelectorAll(".icon-id");
  iconWeek.forEach((e, index) => {
    if (index < icon.length) {
      e.src = "https:" + icon[index+1];
    }
    console.log(e.src);
  });

  const minTempWeek = document.querySelectorAll(".temperature-min-text");
  minTempWeek.forEach((e, index) => {
    if (index < mintemp_c.length) {
      e.textContent = mintemp_c[index+1];
    }
  });

  const dataWeek = document.querySelectorAll(".text-weekDay");

  const daysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dataWeek.forEach((e, index) => {
    if (index < date.length) {
      const newDate = new Date(date[index+1]);    // 2024-11-09
      
      e.textContent = daysArr[newDate.getDay()];
    }
    console.log(date);
  });
  
}
