

const classes = {
  backdrop: 'loader-backdrop'
}

function chamarApi() {
  const input = document.getElementById('input');
  const inputLength = document.getElementById('length');

  const loaderBackdrop = document.getElementById('loader-backdrop');
  loaderBackdrop.style.display = 'flex';

  const sectionImages = document.getElementById('cloud-images');
  const figure = document.createElement('figure');

  const newImage = document.createElement('img');
  const figCaption = document.createElement('figcaption');

  const classNameImageWordCloud = 'wordcloud-result-image'
  const qtdeImagens = document.querySelectorAll(`.${classNameImageWordCloud}`).length;

  figCaption.textContent = `Word Cloud ${qtdeImagens}: ${input.value}`;

  newImage.alt = `img: ${input.value}`;
  newImage.className = classNameImageWordCloud;

  figure.appendChild(newImage);
  figure.appendChild(figCaption);

  const loadImage = document.getElementById('loader-image');
  loadImage.textContent = `Buscando twitter relacionados sobre ${input.value}`;

  fetch(`http://localhost:3000/${input.value}/${inputLength.value}`)
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      loaderBackdrop.style.display = 'none';
      newImage.src = res;
      sectionImages.appendChild(figure);
    })
    .catch(() => {
      loaderBackdrop.style.display = 'none';
    });
}

function handleKeyDown(e) {
  console.log(e);
  if (e.keyCode === 13) {
    chamarApi();
  }

}

function handleKeyDownLength(e){
  console.log(e.target.value);
  const valor = parseInt(e.target.value,10);
  const inputLength = document.getElementById('length');

  if(valor>1000){
    inputLength.value = 1000;
  }
  if(valor<1){
    inputLength.value = 1;
  }
}