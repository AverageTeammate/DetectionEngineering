// Shared behaviour for the query / script library pages:
// search + category filter, expand/collapse a row, and copy-to-clipboard.

function filterQueries() {
  const search = document.getElementById("searchBar").value.toLowerCase();
  const category = document.getElementById("filterCategory").value;
  const rows = document.querySelectorAll(".query-table tbody tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    const rowCategory = row.getAttribute("data-category");

    if ((text.includes(search) || search === "") && (category === "all" || rowCategory === category)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function toggleQuery(id) {
  const queryRow = document.getElementById(id);
  queryRow.style.display = queryRow.style.display === "table-row" ? "none" : "table-row";
}

function copyToClipboard(id) {
  const block = document.getElementById(id);
  const button = block.parentElement.querySelector(".copy-btn");
  const originalLabel = button.dataset.label || button.textContent;
  button.dataset.label = originalLabel;

  const flash = message => {
    button.textContent = message;
    setTimeout(() => { button.textContent = originalLabel; }, 1500);
  };

  navigator.clipboard.writeText(block.innerText).then(
    () => flash("Copied!"),
    () => flash("Copy failed")
  );
}
