async function search(searchType, searchTerm, page = 1) {
  const baseURL = "https://rickandmortyapi.com/api/";
  const endpoint = `${searchType}/?name=${searchTerm}&page=${page}`;

  try {
    const response = await fetch(baseURL + endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    displayResults(data.results, searchType);
    if (data.info) {
      displayPagination(data.info, searchType, searchTerm);
    } else {
      console.error("Error: Pagination information not found.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = "Invalid search or no results found!";
    errorMessageElement.style.display = "block";
  }
}

function getPageNumberFromUrl(url) {
  if (!url) return 0;
  const pageNumber = parseInt(url.split("=")[1]);
  return pageNumber;
}
