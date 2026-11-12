
/* Step 1: Get elements from the HTML page */
const form = document.getElementById("homework-form");
const assignmentList = document.getElementById("assignment-list");

/* Step 2: Listen for form submissions */
form.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get the values entered by the user
    const course = document.getElementById("course").value;
    const assignment = document.getElementById("assignment").value;
    const dueDate = document.getElementById("due-date").value;

    // Step 3: Create a new list item
    const listItem = document.createElement("li");

    // Create text describing the assignment
    const assignmentText = document.createElement("span");
    assignmentText.textContent =
        `${course}: ${assignment} - Due: ${dueDate}`;

    listItem.appendChild(assignmentText);

    // Step 4: Create a completion button
    const completeButton = document.createElement("button");
    completeButton.textContent = "Mark Complete";

    completeButton.addEventListener("click", function() {
        assignmentText.style.textDecoration = "line-through";
        completeButton.textContent = "Completed";
        completeButton.disabled = true;
    });

    listItem.appendChild(completeButton);

    // Step 5: Add the assignment to the page
    assignmentList.appendChild(listItem);

    // Step 6: Clear the form
    form.reset();
});
