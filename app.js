const general__location = document.querySelector('.general__location');
const local_time = document.querySelector('.local_time');
const weather__location = document.querySelector('.weather__location');
const primary__content = document.querySelector('.primary__content');
const primary__content__icon = document.querySelector('.primary__content__icon');
const lat = document.querySelector('.lat');
const long = document.querySelector('.long');
const reg = document.querySelector('.reg');
const main__temprature = document.querySelector('.main__temprature');
const fairy__weather = document.querySelector('.fairy__weather');
const darker__weather = document.querySelector('.darker__weather');
const sunny__weather = document.querySelector('.sunny__weather');
const rainy__weather = document.querySelector('.rainy__weather');

const form = document.querySelector('#form');
const input = document.querySelector('#input');
let region = 'Namangan';

form.addEventListener('submit', changeRegion);
function changeRegion(e){
    e.preventDefault();
    region = input.value;
    console.log(region);
    input.value = '';

const apiKey = "a70ba850a5eb45ddaf591909211707";
const apiLink = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${region}&days=7&aqi=yes&alerts=yes`;

async function loadApiData(){
    const apiData = await fetch(apiLink);
    const apiObject = apiData.json();
    // console.log(apiObject);
    apiObject.then(data => showData(data));
}

loadApiData();

function showData(data){
    const img = document.createElement('img');

    while(primary__content__icon.firstChild){
        primary__content__icon.removeChild(primary__content__icon.firstChild)
    }
    console.log(data);
    general__location.innerHTML = data.location.name + "," + data.location.country;
    local_time.innerHTML = data.current.last_updated;
    weather__location.innerHTML = data.location.name;
    // img.src = data.current.condition.icon;
    img.setAttribute('src', "https://" + data.current.condition.icon)
    primary__content__icon.appendChild(img);
  
    lat.innerHTML = data.location.lat;
    long.innerHTML = data.location.lon;
    reg.innerHTML = data.location.region;
    main__temprature.innerHTML = data.current.temp_c;

    console.log(data.current.condition.text.toLowerCase());
    // switch(data.current.condition.text.toLowerCase().includes()){
    //     case 'cloudy':
    //         fairy__weather.style.display = 'block';
    //         darker__weather.style.display = 'none';
    //         break;
    //     case 'sunny':
    //         fairy__weather.style.display = 'none';
    //         darker__weather.style.display = 'block';
    //         break;  
    // }
    let dateTime = Number(data.current.last_updated.slice(11,13));
    console.log(dateTime);

    if( data.current.condition.text.toLowerCase().includes('sunny') && dateTime > 6 && dateTime < 20){
        fairy__weather.style.display = 'none';
        darker__weather.style.display = 'none';
        rainy__weather.style.display = 'none';
        sunny__weather.style.display = 'flex';
    }
    else if(data.current.condition.text.toLowerCase().includes('cloudy') && ( dateTime < 6 || dateTime >= 18 ) ){
        fairy__weather.style.display = 'flex';
        fairy__weather.style.backgroundColor = '#2a2a2b';
        darker__weather.style.display = 'none';
        rainy__weather.style.display = 'none';
        sunny__weather.style.display = 'none';
    }
    else if(data.current.condition.text.toLowerCase().includes('cloudy') && dateTime > 6 && dateTime < 18){
        fairy__weather.style.display = 'flex';
        fairy__weather.style.backgroundColor = '#0092fb';
        darker__weather.style.display = 'none';
        rainy__weather.style.display = 'none';
        sunny__weather.style.display = 'none';
    }
    else if(data.current.condition.text.toLowerCase().includes('rain')){
        fairy__weather.style.display = 'none';
        darker__weather.style.display = 'none';
        rainy__weather.style.display = 'flex';
        sunny__weather.style.display = 'none';
    }
    else if(data.current.condition.text.toLowerCase().includes('clear') &&( dateTime < 6 || dateTime >= 18 )){
        fairy__weather.style.display = 'none';
        darker__weather.style.display = 'flex';
        rainy__weather.style.display = 'none';
        sunny__weather.style.display = 'none';
    }
   

}

}
