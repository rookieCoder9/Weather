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
export const weatherContainer = (weather: any): any => {
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

export const mainArea = (): any => {
  const mainArea = document.createElement('table');
  mainArea.setAttribute('id', 'mainArea');

  return mainArea;
};
