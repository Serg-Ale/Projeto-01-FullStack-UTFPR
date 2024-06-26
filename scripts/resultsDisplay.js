// resultsDisplay.js
function displayResults(results, searchType) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (!results || results.length === 0) {
    // Verificar se 'results' é indefinido ou vazio
    resultsContainer.innerHTML =
      "No results found. Please enter a valid search input";
    return;
  }

  results.forEach((result) => {
    const item = createResultItem(result, searchType);
    resultsContainer.appendChild(item);
  });
}

function createResultItem(result, searchType) {
  const item = document.createElement("div");
  item.className = "item";

  const itemText = document.createElement("div");
  itemText.className = "item-text";

  const name = document.createElement("h2");
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
