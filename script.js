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
  
  const authorFField = document.getElementById("author-first");
  const authorLField = document.getElementById("author-last");
  const articleNField = document.getElementById("article-name");
  const pubYField = document.getElementById("pub-year");
  const publicationField = document.getElementById("publication");
  const dateVField = document.getElementById("date-viewed");
  const urlField = document.getElementById("url");

  let authorFirst = authorFField.value;
  let authorLast = authorLField.value;
  let articleName = articleNField.value;
  let pubYear = pubYField.value;
  let publication = publicationField.value;
  let dateViewed = dateVField.value;
  let url = urlField.value;

  // Incremented by each correct input, 7 needed to submit form.
  let validations = 0;
  
  // Grab author's initial, print error for invalid input.
  if (authorFirst.length < 1) {
    printError(authorFField);
    console.log("authorFirst error: ", authorFirst);
  } else {
    authorFirst = authorFirst[0].toUpperCase();
    validations++;
  }
  // Capitalise author's surname, accounting for names with spaces.
  // Validate input.
  if (authorLast.indexOf(" ") != -1) {
    let separateNames = authorLast.split(" ");
    for (let i = 0; i < separateNames.length; i++) {
      let capital = separateNames[i][0].toUpperCase();
      separateNames[i] = capital + separateNames[i].slice(1).toLowerCase();
    }
    authorLast = separateNames.join(" ");
  } 
  if (authorLast.length > 0) {
    authorLast = authorLast[0].toUpperCase() + authorLast.slice(1).toLowerCase();
    validations++;
  } else { 
    printError(authorLField);
    console.log("authorLast error: ", authorLast);
  }

  // Check for appropriate length in article title.
  if (articleName.length < 1) {
    printError(articleNField);
    console.log("articleName error: ", articleName);
  } else validations++;

  // Check length of publication name.
  if (publication.length < 1) {
    printError(publicationField);
    console.log("publication error: ", publication);
  } else validations++;

  // Create new Date object for use with autofill feature and to validate year input.
  clock = new Date();
  let autofillRegex = /^T$/i;
  if (autofillRegex.test(pubYear)) pubYear = clock.getFullYear();
  if (pubYear < 1000 || pubYear > clock.getFullYear()) {
      printError(pubYField);
      console.log("pubYear error: ", pubYear);
  } else validations++;

  // Allow autofill for date viewed, validate input.
  let dateFormatRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (autofillRegex.test(dateViewed)) dateViewed = clock.getDate() + "/" + (clock.getMonth()+1) + "/" + clock.getFullYear();
  if (!dateFormatRegex.test(dateViewed)) {
    printError(dateVField);
    console.log("dateViewed error: ", dateViewed);
  } else validations++;

  // Verify URL field:
  if (url.length < 1) {
    printError(urlField);
    console.log("url error: ", url);
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
  
  if (validations === 7) {
    reference = `${authorLast}, ${authorFirst} ${pubYear}, <i>${articleName}</i>, ${publication}, viewed ${dateViewed}, &#60${url}&#62.`;
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
    document.getElementById("error-field").innerText = "";
}

function clearRefList() {
    document.getElementById("references").innerHTML = "";
}

function printError(...fields) {
  const errorField = document.getElementById("error-field");
  errorField.innerText = "INCORRECT INPUTS, PLEASE TRY AGAIN";

  fields.forEach(field => {
    let inputField = field;
    let defaultColor = inputField.style.color;
  
    inputField.style.color = "rgb(216, 126, 126)";
    inputField.value = "***";

    setTimeout(function() {
      inputField.style.color = defaultColor;
      inputField.value = "";
    },5000);
  })

  setTimeout(function() {
    errorField.innerText = "";
  },3000);
}