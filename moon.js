const  apikey='U0sBNaXOGDNG68OTVZdoPGLGYQVM0fwd';
const listcard = document.querySelector(".list-card");
const list = document.querySelector(".list");
const searchCity = document.querySelector("#searchCity");
const cityName = document.querySelector("#cityName");
const  WeatherText = document.querySelector("#weatherText");
const degree = document.querySelector("#degree");
const imageTime = document.querySelector("#imageTime");
const getCityName = async (city) =>{
    const url ='http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
    const query = `?apikey=${apikey}&q=${city}`;
    const response = await fetch(url + query);
    const data =await response.json();
    return data;
}
searchCity.addEventListener('keyup' ,(e) =>{
   //console.log( );
   if(e.target.value.length===0){
      listcard.classList.add('d-none');

  }else{
    list.innerHTML='';
 getCityName(e.target.value.trim().toLowerCase())
 .then(data =>{
      data.forEach(cities =>{
        list.innerHTML +=`<h4 class="target-class">${cities.LocalizedName}</h4>`;
        listcard.classList.remove('d-none');
      });
 }).catch( err => console.log(err))
    
  }
   
})
 list.addEventListener('click',(event) =>{
  updateTheUi(event.target.innerText.toLowerCase());

 });
 const getCityCode = async (city) =>{
  const url ='http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${apikey}&q=${city}`;
  const response = await fetch(url + query);
  const data =await response.json();
  return data[0];

 }
 const  updateTheUi = (city) =>{
  getCityCode(city)
  .then(data => {
   //console.log(data);
    cityName.innerHTML =`${data.LocalizedName},  ${data.Country.LocalizedName}`;
    searchCity.value='';
    return getWeatherInfo(data.Key);
    
     
     //searchCity.value='';
  }).then(data =>{
    console.log(data);
    WeatherText.innerHTML =`${data.WeatherText}`;
    degree.innerHTML =`${data.Temperature.Metric.Value} &deg;c`;
    
    if(data.IsDayTime){
      imageTime.setAttribute('src','./day.jpeg');
    }else{
      imageTime.setAttribute('src','./night.jpeg');
    }
    localStorage.setItem('city',city);
  })
    
     
     listcard.classList.add('d-none');
  
}
 const getWeatherInfo = async(cityCode) =>{
  const url ='http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${cityCode}?apikey=${apikey}`;
  const response = await fetch(url + query);
  const data =await response.json();
   //console.log(data[0]);
  return data[0];
   
 
}
if(localStorage.getItem('city').length >0){
  updateTheUi(localStorage.getItem('city'));
}
 
 