const API = {
    href: {
        main: 'https://api.openweathermap.org/data/2.5/forecast?q=',
        icon: 'https://openweathermap.org/img/wn/',
    },
    key: '&APPID=89be36fdba119d644c16a324ba793c13',
    units: '&units=metric',
};
const MAX_DAYS = 5;

const button = document.getElementById('get');
const cityInput = document.getElementById('city');
const output = document.getElementById('output');

button.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    if (!city) {
        getMessageError();
        return;
    }

    fetch(API.href.main + city + API.key + API.units)
        .then(response => response.json())
        .then(result => {
            if (result.cod != 200) {
                getMessageError();
                return;
            }
            output.innerHTML = '';

            /* Counter day */
            let count = 0;
            /* DOM-element where insert data-day */
            let target;

                for(let i = 0; i < result.list.length; i++){
                    const item = result.list[i];
                    if (count === 0 || item.dt_txt.substr(11,5) === '00:00') {
                        count++;
                        if(count > MAX_DAYS){
                            break;
                        }
                        target = writeNewDay(target, item);
                    }
                    writeItemDay(target, item);
                }

        }, error => console.log(error));
});
/**
 * А block is formed for a specific day
 *
 * @param target element to be inserted into
 * @param item object with weather for a specific time
 */
function writeNewDay(target, item) {
    output.insertAdjacentHTML('beforeend', '<div class="day"></div>');
    const list = output.querySelectorAll('.day');
    target = list[list.length - 1];

    /* Days title */
    target.insertAdjacentHTML('beforeend', '<div class="day__title">' + (new Date(item.dt * 1000)).toLocaleDateString('en-US', {
        weekday: 'long',
        month: '2-digit',
        day: '2-digit'
    }) + '</div>');
    return target;
}

/**
 * Weather information is generated for every 3 hours
 *
 * @param elementTarget element to be inserted into
 * @param item object with weather for a specific time
 */
function writeItemDay(elementTarget, item) {
    const titleName = `<span>${item.dt_txt.substr(11,5)}</span>`;
    const weather = item.weather[0];
    const titleIcon = `<img src="${API.href.icon + weather.icon}.png" alt ="${weather.main}" title="${weather.description}" >`;
    const titleTemp = `<span>${Math.round(item.main.temp)}°C</span>`;
    const feltTemp = `felt ${Math.round(item.main.feels_like)}°C`;
    const clouds = `clouds ${item.clouds.all}%`;
    const wind = `wind ${item.wind.speed} m/s`;

    elementTarget.insertAdjacentHTML('beforeend',
        `<div class="item-time__wrapper">
            <div class="item-time__title">${titleName}${titleIcon}${titleTemp}</div>
            <div class="item-time__description">${feltTemp} / ${clouds} / ${wind}</div>
        </div>`);
}

/**
 * Error message is shown for a while
 */
function getMessageError() {
    const message = document.querySelector('.error-message');
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = '';
    }, 2000);
}