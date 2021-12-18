const main = document.querySelector(".main");
const searchTxt = document.querySelector(".search");
const searchBtn = document.querySelector("#searchBtn");
const infoHead = document.querySelector('#info');

searchBtn.addEventListener("click", searchMovie);

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

getApi(APIURL);

async function getApi(url) {
  const res = await fetch(url);
  const resData = await res.json();
  console.log(resData);

  getDesign(resData);
}

function getDesign(resData) {
  main.innerHTML = '';

  resData.results.forEach((element) => {
    const { poster_path, title, vote_average } = element;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `<img src="${imgPath + poster_path}" alt="" id="img">
                               <div class="movieInfo">
                                     <h3>${title}</h3>
                                    <span>${vote_average}</span>
                                </div>`;

    main.appendChild(movieEl);
  });
}

function searchMovie() {
    console.log('click');
  let searchTerm = searchTxt.value;
  if (searchTerm) {
    getApi(SEARCHAPI + searchTerm);
  }

  infoHead.innerText = "Searched results for " + searchTerm + '...';
  infoHead.style.color = 'gray';

  searchTxt.value = '';
}
