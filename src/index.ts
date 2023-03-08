import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';

/**
 * Initialization data for the Weather extension.
 */

const navbar = () => {
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

  button.onclick = async () => {
    const city = <HTMLInputElement>document.getElementById('searchInput');
    const cityName = city.value ? city.value : '';

    const weather = await fetchWeather(cityName);
    if (weather) {
      const mainArea = <HTMLInputElement>document.getElementById('mainArea');

      const result = weatherContainer(weather);
      if (result !== undefined) {
        mainArea.innerHTML = '';
        mainArea.appendChild(result);
      }
    }
  };
  div.appendChild(input);
  div.appendChild(button);
  nav.appendChild(img);
  nav.appendChild(div);

  return nav;
};

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

const makeEntry = (weather: any) => {
  const item = document.createElement('tr');
  item.classList.add('container-row');
  const span = document.createElement('th');
  span.innerHTML = 'Weather';
  const span2 = document.createElement('th');
  span2.innerHTML = weather.weather[0].main;
  item.appendChild(span);
  item.appendChild(span2);
  return item;
};
const weatherContainer = (weather: any) => {
  if (weather.main === undefined) {
    alert('No city found !');
    return;
  }
  const div = document.createElement('div');
  div.classList.add('weatherContainer');
  const item = document.createElement('tr');
  item.classList.add('container-row');
  const span = document.createElement('th');
  span.innerHTML = 'Name';
  const span2 = document.createElement('th');
  span2.innerHTML = weather.name;
  item.appendChild(span);
  item.appendChild(span2);
  div.appendChild(item);
  div.appendChild(makeEntry(weather));

  Object.entries(weather.main).forEach(([key, value]) => {
    const item = document.createElement('tr');
    item.classList.add('container-row');
    const span = document.createElement('th');
    span.innerHTML = `${key}`;
    const span2 = document.createElement('th');
    span2.innerHTML = `${value}`;
    item.appendChild(span);
    item.appendChild(span2);

    div.appendChild(item);
  });
  return div;
};

const mainArea = () => {
  const mainArea = document.createElement('table');
  mainArea.setAttribute('id', 'mainArea');

  return mainArea;
};
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'Weather:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('Weather is activate bye ! :)');
    console.log('ICommandPalette:', palette);
    const newWidget = () => {
      const content = new Widget();
      const widget = new MainAreaWidget({ content });
      widget.id = 'Weather';
      widget.title.label = 'Weather';
      widget.title.closable = true;
      content.addClass('app');
      content.node.appendChild(navbar());
      content.node.appendChild(mainArea());
      return widget;
    };
    let widget = newWidget();
    const command = 'Weather:open';
    app.commands.addCommand(command, {
      label: 'Weather Application',
      execute: () => {
        if (widget.isDisposed) {
          widget = newWidget();
        }
        if (!widget.isAttached) {
          app.shell.add(widget, 'main');
        }
        app.shell.activateById(widget.id);
      }
    });
    palette.addItem({ command, category: 'Tutorial' });
  }
};

export default plugin;
