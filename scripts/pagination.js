function displayPagination(info, searchType, searchTerm) {
  const totalPages = info.pages;
  const currentPage = getPageNumberFromUrl(info.prev) + 1;

  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  if (info.prev) {
    const prevButton = createPaginationButton("Previous", false);
    prevButton.addEventListener("click", () => {
      search(searchType, searchTerm, currentPage - 1);
    });
    paginationContainer.appendChild(prevButton);
  }

  if (info.next) {
    const nextButton = createPaginationButton("Next", false);
    nextButton.addEventListener("click", () => {
      search(searchType, searchTerm, currentPage + 1);
    });
    paginationContainer.appendChild(nextButton);
  }
}

function createPaginationButton(text, disabled) {
  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = disabled;
  return button;
}
