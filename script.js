function chamarApi() {
  const input = document.getElementById("input");
  const loader = document.getElementById('loader');
  loader.classList.toggle('loader-off');
  loader.classList.toggle('loader-on');
  const img = document.getElementById("imagem_twitter");
  try {
    fetch(`http://localhost:3000/${input.value}`)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        loader.classList.toggle('loader-off');
        loader.classList.toggle('loader-on');
        img.src = res;
      });
  } catch (e) {
    console.log(e);
    loader.classList.toggle('loader-off');
    loader.classList.toggle('loader-on');
  }
}
