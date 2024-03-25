// pagination.js
function displayPagination(info, searchType, searchTerm) {
  const totalPages = info.pages;
  const currentPage = getPageNumberFromUrl(info.prev) + 1;

  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const prevButton = createPaginationButton("Previous", !info.prev);
  prevButton.addEventListener("click", () => {
    search(searchType, searchTerm, currentPage - 1);
  });
  paginationContainer.appendChild(prevButton);

  const nextButton = createPaginationButton("Next", !info.next);
  nextButton.addEventListener("click", () => {
    search(searchType, searchTerm, currentPage + 1);
  });
  paginationContainer.appendChild(nextButton);
}

function createPaginationButton(text, disabled) {
  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = disabled;
  return button;
}
