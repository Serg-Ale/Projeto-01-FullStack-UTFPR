// apiRequests.js
async function search(searchType, searchTerm, page = 1) {
  const baseURL = "https://rickandmortyapi.com/api/";
  const endpoint = `${searchType}/?name=${searchTerm}&page=${page}`;

  try {
    const response = await fetch(baseURL + endpoint);
    const data = await response.json();

    displayResults(data.results, searchType);
    displayPagination(data.info, searchType, searchTerm);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function getPageNumberFromUrl(url) {
  if (!url) return 0;
  const pageNumber = parseInt(url.split("=")[1]);
  return pageNumber;
}
