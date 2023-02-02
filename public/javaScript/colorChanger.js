const textDiv = document.querySelectorAll('.textDiv');
const makeColor = function () {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};
for (let x of textDiv) {
  setInterval(() => {
    x.style.color = makeColor();
  }, 500);
}