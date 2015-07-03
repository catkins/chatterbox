import $ from 'jquery';
import ColourBox from './colour-box';

const box = new ColourBox(document.getElementById('box'));

box.on('mousemove', (event) => {
  const { x, y }      = box.extractMouseCoordinates(event);
  const newBackground = calculateStyle(x, y);

  box.updateBackgroundColour(newBackground);
  updateCoordinates(x, y);
});

box.updateBackgroundColour(randomColour())

function calculateStyle(x, y) {
  const hue        = Math.floor(x * 360);
  const saturation = Math.floor(100 - y * 100);

  return `hsl(${hue}, ${saturation}%, 70%)`;
}

function updateCoordinates(x, y) {
  $('.coordinates').text(`x: ${x}, y: ${y}`);
}

function randomColour() {
  return calculateStyle(Math.random(), Math.random());
}

