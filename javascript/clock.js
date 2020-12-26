function updateTime() {
  let today = new Date();

  // Time
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  if (+hours < 10) hours = '0' + hours;
  if (+minutes < 10) minutes = '0' + minutes;
  if (+seconds < 10) seconds = '0' + seconds;

  let time = hours + ':' + minutes + ':' + seconds;

  // Day
  let day = today.getDay();
  switch (day) {
    case 0:
      day = "Sunday（日）"
      break;
    case 1:
      day = "Monday（月）"
      break;
    case 2:
      day = "Tuesday（火）"
      break;
    case 3:
      day = "Wednesday（水）"
      break;
    case 4:
      day = "Thursday（木）"
      break;
    case 5:
      day = "Friday（金）"
      break;
    case 6:
      day = "Saturday（土）"
      break;
  }

  // Date
  let date = today.getFullYear() + '/' +
            (today.getMonth() + 1) + '/' +
            today.getDate();

  // Set values
  let timeDiv = document.querySelector('.time');
  timeDiv.innerText = time;

  let daySpan = document.querySelector('.day');
  daySpan.innerText = day;

  let dateSpan = document.querySelector('.date');
  dateSpan.innerText = date;
}

setInterval(updateTime, 1000);
