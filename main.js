const BASE_URL = "https://www.omdbapi.com/?apikey=feac457b&s=";

const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elSelect = document.querySelector(".select");
const elList = document.querySelector("#list");
const elFragmentCardTemplate = document.querySelector(".card-fragment").content;

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = elInput.value.trim();
  const selectedType = elSelect.value;

  if (inputValue) {
    fetchMovies(`${BASE_URL}${inputValue}`, selectedType);
    elInput.value = "";
  }
});

async function fetchMovies(url, type) {
  try {
    let fetchUrl = url;
    if (type) {
      fetchUrl += `&type=${type}`;
    }

    const response = await fetch(fetchUrl);
    if (!response.ok) throw new Error("Error occurred while fetching data");

    const data = await response.json();
    renderMovies(data.Search);
  } catch (error) {
    console.error(error);
  }
}

function renderMovies(movies) {
  elList.innerHTML = "";

  if (!movies) {
    elList.textContent = "No movies found.";
    return;
  }

  const movieFragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const clone = elFragmentCardTemplate.cloneNode(true);
    clone.querySelector(".card__image").src =
      movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/600x400";
    clone.querySelector(".movie__name").textContent = `Title: ${movie.Title}`;
    clone.querySelector(".card__year").textContent = `Year: ${movie.Year}`;
    clone.querySelector(".card__type").textContent = `Type: ${movie.Type}`;

    movieFragment.appendChild(clone);
  });

  elList.appendChild(movieFragment);
}
