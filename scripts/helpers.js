// helpers.js
function noContentInInput() {
  const vet = [];
  displayResults(vet, false);
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
