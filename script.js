function chamarApi() {
    const input = document.getElementById('input');
    const img = document.getElementById('imagem_twitter');
    try {
        fetch(`http://localhost:3000/${input.value}`).then(res => {console.log(res); res.text()}).then(res => {console.log(res); img.src =`data:image/png;base64,${res}` });
    } catch(e) {
        console.log(e);
    }
}