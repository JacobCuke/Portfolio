function changeBackground() {
  let div = document.getElementById('colorDiv');
  let header = document.getElementsByTagName('header');
  let currentColor = div.style.backgroundColor;
  switch(currentColor) {
    case 'rgb(255, 0, 0)':
      div.style.backgroundColor = 'rgb(255, 127, 0)';
      header[0].style.backgroundColor = 'rgba(255, 127, 0, 0.6)';
      break;

    case 'rgb(255, 127, 0)':
      div.style.backgroundColor = 'rgb(255, 255, 0)';
      header[0].style.backgroundColor = 'rgba(255, 255, 0, 0.6)';
      break;

    case 'rgb(255, 255, 0)':
      div.style.backgroundColor = 'rgb(0, 255, 0)';
      header[0].style.backgroundColor = 'rgba(0, 255, 0, 0.6)';
      break;

    case 'rgb(0, 255, 0)':
      div.style.backgroundColor = 'rgb(0, 0, 255)';
      header[0].style.backgroundColor = 'rgba(0, 0, 255, 0.6)';
      break;

    case 'rgb(0, 0, 255)':
      div.style.backgroundColor = 'rgb(75, 0, 130)';
      header[0].style.backgroundColor = 'rgba(75, 0, 130, 0.6)';
      break;

    case 'rgb(75, 0, 130)':
      div.style.backgroundColor = 'rgb(148, 0, 211)';
      header[0].style.backgroundColor = 'rgba(148, 0, 211, 0.6)';
      break;

    case 'rgb(148, 0, 211)':
      div.style.backgroundColor = 'rgb(255, 0, 0)';
      header[0].style.backgroundColor = 'rgba(255, 0, 0, 0.6)';
      break;

    default:
      div.style.backgroundColor = 'rgb(255, 0, 0)';
      header[0].style.backgroundColor = 'rgba(255, 0, 0, 0.6)';
  }
}

function resetBackground () {
  let div = document.getElementById('colorDiv');
  let header = document.getElementsByTagName('header');
  div.style.backgroundColor = null;
  header[0].style.backgroundColor = null;
}
