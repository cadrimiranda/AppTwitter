function chamarApi() {
    const input = document.getElementById('input');
    const termo = document.getElementById('termo');
    try {
        fetch(`http://localhost:3000/${input.value}`).then(res => res.text()).then(res => {console.log(res); termo.innerText = res;});
    } catch(e) {
        console.log(e);
    }
}