// eventListeners.js
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
