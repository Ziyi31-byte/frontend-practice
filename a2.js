// represent an array to store all questions
let questions = JSON.parse(localStorage.getItem("questions")) || [];
let allHistoricalQuestions = JSON.parse(localStorage.getItem("allHistoricalQuestions")) || []; 


// load display first
window.onload = displayQuestions; 


// represent the object of one question
class questionClass {
    constructor(id, title, description, category, complexity) {
        this.id = id; 
        this.title = title; 
        this.description = description; 
        this.category = category;
        this.complexity = complexity;
    }
}


// show different sections
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => { // remove sections that are currently displayed to be inactive
        section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active"); // set changed section to be active
    if (sectionId === "display") {displayQuestions(); }
}


// build a question object and append to array and store to local
function addQuestion() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const complexity = document.getElementById("complexity").value;

    checkComplexityValidity(complexity); 

    var newQuestion = new questionClass(allHistoricalQuestions.length+1, title, description, category, complexity); 
    questions.push(newQuestion);
    allHistoricalQuestions.push(newQuestion); 
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("allHistoricalQuestions", JSON.stringify(allHistoricalQuestions));

    // clean up the fields
    document.getElementById("title").value = null;
    document.getElementById("description").value = null;
    document.getElementById("category").value = null;
    document.getElementById("complexity").value = null;
}

function checkComplexityValidity(complexity) {
    if ((complexity) && isNaN(parseInt(complexity))) { // if complexity is not number -> not a valid input
        alert("Not a valid input for complexity!");
        throw new Error("Terminating execution due to error.");
    }
}


// display all questions in the questions array
function displayQuestions() {
    const tbody = document.getElementById("questionsTableBody");
    tbody.innerHTML = "";

    for (var question of questions) {
        var row = document.createElement("tr");
        row.insertCell(0).textContent = question.id;
        row.insertCell(1).textContent = question.title;
        row.insertCell(2).textContent = question.description;
        row.insertCell(3).textContent = question.category;
        row.insertCell(4).textContent = question.complexity;
        tbody.appendChild(row);
    }

    updateTableVisibility(); 
}


// make the table invisible if the table body is empty
function updateTableVisibility() {
    
    const tbody = document.getElementById("questionsTableBody");
    const thead = document.getElementById("questionsTableHead");
    const waitMsg = document.getElementById("waitMsg");

    if (tbody === null || tbody.childElementCount === 0) {
        thead.style.display = "none";
        waitMsg.style.display = "block";
    } else {
        thead.style.display = "table-header-group";  
        waitMsg.style.display = "none";
    }
}


// update the array list of all questions and the tbody
function updateQuestion() {
    const id = document.getElementById("idToUpdate").value;
    const newTitle = document.getElementById("updatedTitle").value;
    const newDescription = document.getElementById("updatedDescription").value;
    const newCategory = document.getElementById("updatedCategory").value;
    const newComplexity = document.getElementById("updatedComplexity").value;
    checkComplexityValidity(newComplexity); 

    const question = questions.find(q => q.id === parseInt(id));

    if (question) {
        question.title = newTitle; 
        question.description = newDescription; 
        question.category = newCategory; 
        question.complexity = newComplexity; 
        localStorage.setItem("questions", JSON.stringify(questions));
    } else {
        alert("Question is not found!");
    }

    // clean up the fields
    document.getElementById("idToUpdate").value = null;
    document.getElementById("updatedTitle").value = null;
    document.getElementById("updatedDescription").value = null;
    document.getElementById("updatedCategory").value = null;
    document.getElementById("updatedComplexity").value = null;
}


function deleteQuestion() {
    const id = document.getElementById("idToDelete").value;
    const indexOfTheQuestion = questions.findIndex(q => q.id === parseInt(id));

    if (indexOfTheQuestion !== -1) {
        questions.splice(indexOfTheQuestion, 1);
        localStorage.setItem("questions", JSON.stringify(questions));
    } else {
        alert("Question is not found!"); 
    }

    // clean up the fields
    document.getElementById("idToDelete").value = null;
}