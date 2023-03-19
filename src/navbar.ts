import { handleRunningKernels } from './kernel';
import { weatherContainer } from './mainArea';

const fetchWeather = async (cityName: string) => {
  const data = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=' +
      cityName +
      '&APPID=74fe49c5965ce16b9e31f6597dc10e11&units=metric'
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      alert(err);
    });

  return data;
};

const handleClick = async () => {
  const city = <HTMLInputElement>document.getElementById('searchInput');
  const cityName = city.value ? city.value : '';
  if (cityName === '') {
    alert('Enter a city !');
    return;
  }
  const weather = await fetchWeather(cityName);

  if (weather) {
    handleRunningKernels(weather);
    const mainArea = <HTMLInputElement>document.getElementById('mainArea');

    const result = weatherContainer(weather);
    if (result !== undefined) {
      mainArea.innerHTML = '';
      mainArea.appendChild(result);
    }
  }
};

export const navbar = (): any => {
  const nav = document.createElement('div');
  const img = document.createElement('img');
  const div = document.createElement('div');
  const button = document.createElement('button');
  const input = document.createElement('input');
  div.classList.add('container-row');

  img.src =
    'https://i.pinimg.com/originals/06/c4/f7/06c4f70ec5931e2342e703e8a3f0a253.png';
  nav.classList.add('nav');
  img.alt = 'Weather App logo';
  img.classList.add('img');

  input.placeholder = 'Enter City';

  input.setAttribute('id', 'searchInput');

  button.classList.add('button');
  button.innerText = ' Find ';

  button.onclick = handleClick;
  div.appendChild(input);
  div.appendChild(button);
  nav.appendChild(img);
  nav.appendChild(div);

  return nav;
};
