document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", () => {
    const searchType = document.getElementById("searchType").value;
    const searchTerm = document.getElementById("searchInput").value.trim();

    if (searchTerm !== "") {
      search(searchType, searchTerm);
    } else {
      noContentInInput();
    }
  });
});

function noContentInInput() {
  const vet = [];
  displayResults(vet, false);
}

async function search(searchType, searchTerm, page = 1) {
  const baseURL = "https://rickandmortyapi.com/api/";
  const endpoint = `${searchType}/?name=${searchTerm}&page=${page}`;

  try {
    const response = await fetch(baseURL + endpoint);
    const data = await response.json();
    console.log(data);

    displayResults(data.results, searchType);

    // Pass the page information to display pagination buttons
    displayPagination(data.info, searchType, searchTerm);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayPagination(info, searchType, searchTerm) {
  const totalPages = info.pages;
  const currentPage = getPageNumberFromUrl(info.prev) + 1; // Get current page from prev URL

  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  // Create "Previous" button
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = !info.prev; // Disable button if no previous page
  prevButton.addEventListener("click", () => {
    search(searchType, searchTerm, currentPage - 1);
  });
  paginationContainer.appendChild(prevButton);

  // Create "Next" button
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = !info.next; // Disable button if no next page
  nextButton.addEventListener("click", () => {
    search(searchType, searchTerm, currentPage + 1);
  });
  paginationContainer.appendChild(nextButton);
}

function getPageNumberFromUrl(url) {
  if (!url) return 0; // If no URL provided, assume first page
  const pageNumber = parseInt(url.split("=")[1]);
  return pageNumber;
}

function displayResults(results, searchType) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultsContainer.innerHTML =
      "No results found. Please enter a search input";
    return;
  }

  const container = document.createElement("div");
  container.id = "test";

  results.forEach((result) => {
    const item = createResultItem(result, searchType);
    container.appendChild(item);
  });

  resultsContainer.appendChild(container);
}

function createResultItem(result, searchType) {
  const item = document.createElement("div");
  item.className = "item";

  const itemText = document.createElement("div");
  itemText.className = "item-text";

  const name = document.createElement("h1");
  name.textContent = result.name;
  itemText.appendChild(name);

  switch (searchType) {
    case "character":
      createCharacterDetails(result, itemText, item);
      break;
    case "location":
      createLocationDetails(result, itemText);
      break;
    case "episode":
      createEpisodeDetails(result, itemText);
      break;
    default:
      break;
  }

  item.appendChild(itemText);
  return item;
}

function createCharacterDetails(result, itemText, item) {
  const img = document.createElement("img");
  img.src = result.image;
  img.className = "item-image";
  item.appendChild(img);

  const episodes = createParagraph(
    "episodes",
    `Total episodes - ${result.episode.length}`
  );
  itemText.appendChild(episodes);

  const status = createParagraph("status", `Status - ${result.status}`);
  if (result.status === "Dead") {
    status.id = "dead";
  }
  itemText.appendChild(status);

  const species = createParagraph("species", `Species - ${result.species}`);
  itemText.appendChild(species);

  if (result.type !== "") {
    const type = createParagraph("type", `Type - ${result.type}`);
    itemText.appendChild(type);
  }
}

function createLocationDetails(result, itemText) {
  if (result.dimension !== "") {
    const dimension = createParagraph(
      "dimension",
      `Dimension - ${result.dimension}`
    );
    itemText.appendChild(dimension);
  }

  if (result.type !== "") {
    const type = createParagraph("type", `Type - ${result.type}`);
    itemText.appendChild(type);
  }
}

function createEpisodeDetails(result, itemText) {
  const airDate = createParagraph("air-date", `Air date - ${result.air_date}`);
  itemText.appendChild(airDate);

  const episode = createParagraph("episode", `Episode - ${result.episode}`);
  itemText.appendChild(episode);
}

function createParagraph(className, text) {
  const paragraph = document.createElement("p");
  paragraph.className = className;
  paragraph.innerText = text;
  return paragraph;
}
