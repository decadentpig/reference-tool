let inputsForm = document.querySelector("#inputs-form");
let refListPage = document.querySelector("#ref-list");

function init() {
  inputsForm.style.display = "grid";
}

function toggleView() {
  if (inputsForm.style.display === "grid") {
    inputsForm.style.display = "none";
    refListPage.style.display = "grid";
  } else {
    refListPage.style.display = "none";
    inputsForm.style.display = "grid";
  }
}

function createReference() {
  let referenceList = document.getElementById("references");
  
  let authorFirst = document.getElementById("author-first").value;
  let authorLast = document.getElementById("author-last").value;
  let articleName = document.getElementById("article-name").value;
  let pubYear = document.getElementById("pub-year").value;
  let publication = document.getElementById("publication").value;
  let dateViewed = document.getElementById("date-viewed").value;
  let url = document.getElementById("url").value;

  // Incremented by each correct input.
  let validations = 0;
  
  // Grab author's initial, print error for invalid input.
  authorFirst = authorFirst[0].toUpperCase();
  if (authorFirst.length < 1) {
    authorFirst = "INPUT ERROR - FIRST NAME";
  } else validations++;

  // Capitalise author's surname, accounting for names with spaces.
  if (authorLast.indexOf(" ") != -1) {
    let separateNames = authorLast.split(" ");
    for (let i = 0; i < separateNames.length; i++) {
      let capital = separateNames[i][0].toUpperCase();
      separateNames[i] = capital + separateNames[i].slice(1).toLowerCase();
    }
    authorLast = separateNames.join(" ");
  } else {
    authorLast = authorLast[0].toUpperCase() + authorLast.slice(1).toLowerCase();
  }
  // Author surname: print error for invalid input.
  if (authorLast.length < 2) {
      authorLast = "INPUT ERROR - LAST NAME";
  } else validations++;

  // Check for appropriate length in article title.
  if (articleName.split(" ").length < 1) {
      articleName = "INPUT ERROR - ARTICLE NAME";
  } else validations++;

  // Check length of publication name.
  if (publication.length < 2) {
      publication = "INPUT ERROR - PUBLICATION NAME";
  } else validations++;

  // Create new Date object for use with autofill feature and to validate year input.
  clock = new Date();
  let autofillRegex = /^T$/i;
  if (autofillRegex.test(pubYear)) pubYear = clock.getFullYear();
  if (pubYear < 1000 || pubYear > clock.getFullYear()) {
      pubYear = "INPUT ERROR - PUBLICATION YEAR";
  } else validations++;

  // Allow autofill for date viewed, validate input.
  let dateFormatRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (autofillRegex.test(dateViewed)) dateViewed = clock.getDate() + "/" + (clock.getMonth()+1) + "/" + clock.getFullYear();
  if (!dateFormatRegex.test(dateViewed)) {
    dateViewed = "INPUT ERROR - DATE VIEWED";
  } else validations++;

  // Convert DD/MM/YYYY to written format.
  let dateArray = dateViewed.split("/");
  let months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  dateViewed = dateArray[0] + " " + months[dateArray[1]-1] + " " + dateArray[2];
  
  if (validations === 6) {
    reference = `${authorLast}, ${authorFirst} ${pubYear}, <i>${articleName}</i>, ${publication}, ${dateViewed}, &#60${url}&#62.`;
    referenceList.innerHTML += `<li>${reference}</li><br>`;
    clearInputForm();
  }
}

function clearInputForm() {
    document.getElementById("author-first").value = "";
    document.getElementById("author-last").value = "";
    document.getElementById("article-name").value = "";
    document.getElementById("pub-year").value = "";
    document.getElementById("publication").value = "";
    document.getElementById("date-viewed").value = "";
    document.getElementById("url").value = "";
}