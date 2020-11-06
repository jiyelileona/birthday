import 'regenerator-runtime/runtime';
import moment from 'moment';
import swal from 'sweetalert';
import {shuffle} from 'lodash';

const rainbow = [
  'maroon',
  'orangered',
  'gold',
  'chartreuse',
  'mediumaquamarine',
  'midnightblue',
  'blueviolet',
];

function colorBirthdayText() {
  birthdayForm.firstElementChild.style.color = 'transparent';

  shuffle(rainbow).forEach((color, index) => {
    document.documentElement.style.setProperty(`--color-${index + 1}`, color);
  });
}

function setBackground(hue) {
  document.body.style.backgroundColor = `hsl(${hue % 360}deg, 50%, 70%)`;
}

async function randomBackground() {
  const url =
    'https://www.random.org/integers/?num=1&min=1&max=360&col=1&base=16&format=plain&rnd=new';
  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw "Couldn't get a number from random.org";
    }

    let text = await response.text();
    setBackground(Number.parseInt(text, 16));
  } catch (err) {
    console.error(err);
    let birthday = moment(birthdayInput.value);
    setBackground(birthday.dayOfYear());
  }
}

window.addEventListener('DOMContentLoaded', function () {
  birthdayInput.focus();
});

birthdayForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  let birthday = moment(birthdayInput.value);

  if (birthday.isValid()) {
    let message = `You were born ${birthday.fromNow()}, it was a ${birthday.format('dddd')}`;
    await swal('Congratulations', message, 'success');
    birthdayInput.focus();
    randomBackground();
    colorBirthdayText();
  } else {
    console.error('Please enter a valid date');
  }
});
