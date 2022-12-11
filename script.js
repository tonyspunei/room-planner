let x;
let y;
let currentTarget = null;
let cloneElement = false;

function startDrag(e, clone) {
  const target = e.target;
  
  if (target.tagName === 'IMG' || target.id === "resizeMe") {
    x = e.offsetX;
    y = e.offsetY;
    currentTarget = target;
    cloneElement = clone;
  }
}

function cloneImage(e) {
  startDrag(e, true);
}

function moveImage(e) {
  startDrag(e, false);
}

function removeImage(e) { 
  if (!cloneElement) {
    currentTarget.remove();
  }
}

function stickImage(e) { 
  const image = cloneElement ? currentTarget.cloneNode(true) : currentTarget;
  
  imagesCanvasElement.appendChild(image);
  
  // + 1 for the border
  
  image.style.left = (e.pageX - imagesCanvasElement.offsetLeft - x + 1) + 'px';
  image.style.top = (e.pageY - imagesCanvasElement.offsetTop - y + 1) + 'px';
  
  currentTarget = null;
}

function allowDrag(e) {
  e.preventDefault();
}

// Bind event listeners:
const imagesBarElement = document.getElementById('imagesBar');
const imagesCanvasElement = document.getElementById('raum-bearbeitung');
const raumElemnent = document.querySelector("#resizeMe");

document.addEventListener('dragenter', allowDrag);
document.addEventListener('dragover', allowDrag);

imagesBarElement.addEventListener('dragstart', cloneImage);
imagesBarElement.addEventListener('drop', removeImage);

raumElemnent.addEventListener('dragstart', cloneImage);
raumElemnent.addEventListener('drop', removeImage);

imagesCanvasElement.addEventListener('dragstart', moveImage);
imagesCanvasElement.addEventListener('drop', stickImage);

// Resizeable
const resizeableRaum = document.querySelector(".resizable");
const raumWidth = document.querySelector("#raum-width");
const raumHeight = document.querySelector("#raum-height");

new ResizeObserver((e) => {
  const height = e[0].target.clientHeight;
  const width = e[0].target.clientWidth;
  raumWidth.innerHTML = `${(Number(width)/50).toFixed(1)}m`;
  raumHeight.innerHTML = `${(Number(height)/50).toFixed(1)}m`;
}).observe(raumElemnent);

// Select Texture
const textures = {
  white: "white",
  black: "black",
  holz: "url(https://u7.uidownload.com/vector/220/493/vector-wood-texture-eps-svg.jpg)",
  marmor: "url(https://u7.uidownload.com/vector/296/547/vector-grey-marble-texture-background-vector-free-eps-ai.jpg)"
}

const texturSelector = document.querySelector("#textur");
texturSelector.addEventListener("change", (e) => {
  resizeableRaum.style.background = textures[e.target.value];
})

// Resize mit Input Felder
const breiteInput = document.querySelector("#breite");
const hoeheInput = document.querySelector("#hoehe");
const formElement = document.querySelector(".dauerhafte-werte");

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  raumWidth.innerHTML = `${(Number(breiteInput.value)).toFixed(1)}m`;
  raumHeight.innerHTML = `${(Number(hoeheInput.value)).toFixed(1)}m`;

  // Change width & height
  raumElemnent.style.width = `${Number(breiteInput.value) * 50}px`;
  raumElemnent.style.height = `${Number(hoeheInput.value) * 50}px`;

  // Reset Input Fields
  breiteInput.innerHTML = "";
  hoeheInput.innerHTML = "";
})


