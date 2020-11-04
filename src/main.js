import moment from 'moment';
import swal from 'sweetalert';

birthdayInput.addEventListener('change', function () {
  let birthday = moment(birthdayInput.value);
  let message = `You were born ${birthday.fromNow('years')}, it was a ${birthday.format('dddd')}`;
  swal('Congratulations', message, 'success');
  randomBackground();
});

const randomURL =
  'https://www.randomx.org/integers/?num=1&min=1&max=360&col=1&base=16&format=plain&rnd=new';

function setBackground(hexHue) {
  let hue = Number.parseInt(hexHue, 16);
  document.body.style.backgroundColor = `hsl(${hue}deg, 50%, 70%)`;
}

function randomBackground() {
  fetch(randomURL)
    .then(response => {
      console.log(response.status);
      response.text().then(setBackground);
    })
    .catch(err => {
      let birthday = moment(birthdayInput.value);
      console.log(err.message);
    });
}
