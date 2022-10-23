const form = document.querySelector('#searchform');
const span = document.querySelector('#span');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const title = form.search;
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, { params: { q: title.value } });
    displayImg(res.data);
    // console.log(res);
    title.value = "";

})


const displayImg = (shows) => {
    for (let poster of shows) {
        if (poster.show.image) {
            const img = document.createElement('img');
            img.src = poster.show.image.medium;
            span.append(img);
            img.style.margin = "10px";
        }
    }
}

const reset = document.querySelector('#reset');
reset.addEventListener('click', (e) => {
    span.innerHTML = ""
})