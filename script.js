let inputsForm = document.querySelector("#inputs-form");
let refList = document.querySelector("#ref-list");

function init() {
  inputsForm.style.display = "grid";
}

function toggleView() {
  if (inputsForm.style.display === "grid") {
    inputsForm.style.display = "none";
    refList.style.display = "grid";
  } else {
    refList.style.display = "none";
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
  
  // GRAB AND CASE-CORRECT AUTHOR'S FIRST NAME:
  authorFirst = authorFirst[0].toUpperCase();
  // AUTHOR FIRST NAMEINPUT VALIDATION
  if (authorFirst.length < 1) authorFirst = "INPUT ERROR - FIRST NAME";

  // GRAB AND CASE-CORRECT AUTHOR'S SURNAME, ACCOUNTING FOR SPACES:
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
  // AUTHOR LAST NAME INPUT VALIDATION
  if (authorLast.length < 2) authorLast = "INPUT ERROR - LAST NAME";

  // ARTICLE NAME INPUT VALIDATION
  if (articleName.split(" ").length < 1) articleName = "INPUT ERROR - ARTICLE NAME";
  
  // PUBLICATION YEAR AUTOFILL & INPUT VALIDATION
  clock = new Date();
  if (pubYear === "T" || pubYear == "t") pubYear = clock.getFullYear(); // TO-DO: Update w regex.
  if (pubYear < 1000 || pubYear > clock.getFullYear()) pubYear = "INPUT ERROR - PUBLICATION YEAR";
  
  // PUBLICATION NAME INPUT VALIDATION
  if (publication.length < 1) publication = "INPUT ERROR - PUBLICATION NAME";
  
  // VALIDATE DATE VIEWED INPUT
  if (dateViewed === "T" || dateViewed === "t") { // TO-DO: Update w regex.
    dateViewed = clock.getDate() + "/" + clock.getMonth()+1 + "/" + clock.getFullYear();
    console.log("Made the month: ", clock.getMonth()+1);
  } else if (dateViewed.length != 10) { // TO-DO: Update w regex.
    dateViewed = "INPUT ERROR - DATE VIEWED";
  }
  
  // CONVERT FROM DATE FORMAT
  console.log("dateViewed before array split: ", dateViewed);
  let dateArray = dateViewed.split("/");
  console.log("date array is: ", dateArray);
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
  
  // COMPILE CORRECT REFERENCE FROM INPUTS
  reference = `${authorLast}, ${authorFirst} ${pubYear}, <i>${articleName}</i>, ${publication}, ${dateViewed}, &#60${url}&#62.`;
  
  referenceList.innerHTML += `<li>${reference}</li>`;
}