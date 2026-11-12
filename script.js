
/* Get HTML elements */
const form = document.getElementById("homework-form");
const assignmentList = document.getElementById("assignment-list");

/* Load saved assignments from browser storage */
let assignments = JSON.parse(
    localStorage.getItem("assignments")
) || [];

/* Save assignments to browser storage */
function saveAssignments() {
    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );
}

/* Display all assignments on the webpage */
function displayAssignments() {

    // Clear the existing list before displaying
    assignmentList.innerHTML = "";

    assignments.forEach(function(homework) {

        // Create a list item
        const listItem = document.createElement("li");

        // Create assignment description
        const assignmentText = document.createElement("span");

        assignmentText.textContent =
            `${homework.course}: ${homework.assignment} - Due: ${homework.dueDate}`;

        // Show completed assignments with a line through them
        if (homework.completed) {
            assignmentText.style.textDecoration = "line-through";
        }

        listItem.appendChild(assignmentText);

        // Create completion button
        const completeButton = document.createElement("button");

        completeButton.textContent = homework.completed
            ? "Completed"
            : "Mark Complete";

        completeButton.disabled = homework.completed;

        completeButton.addEventListener("click", function() {

            homework.completed = true;

            // Save the updated completion status
            saveAssignments();

            // Refresh the displayed list
            displayAssignments();
        });

        
// Create a container to hold both buttons
const buttonContainer = document.createElement("div");
buttonContainer.className = "button-container";

// Give the completion button its own CSS class
completeButton.className = "complete-btn";

// Add completion button to container
buttonContainer.appendChild(completeButton);

// Create a Delete button
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";

// Delete the selected assignment when clicked
deleteButton.addEventListener("click", function() {

    // Find the assignment's position in the array
    const index = assignments.indexOf(homework);

    // Remove the assignment from the array
    if (index !== -1) {
        assignments.splice(index, 1);
    }

    // Save the updated list
    saveAssignments();

    // Refresh the displayed assignments
    displayAssignments();
});

// Add the Delete button to the assignment card
// Give the delete button its own CSS class
deleteButton.className = "delete-btn";

// Add delete button to container
buttonContainer.appendChild(deleteButton);

// Add both buttons to the assignment card
listItem.appendChild(buttonContainer);

// Display the assignment card
assignmentList.appendChild(listItem);


    });
}

/* Handle new assignment submissions */
form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Read the form inputs
    const course = document.getElementById("course").value;
    const assignment = document.getElementById("assignment").value;
    const dueDate = document.getElementById("due-date").value;

    // Create an assignment object
    const newAssignment = {
        course: course,
        assignment: assignment,
        dueDate: dueDate,
        completed: false
    };

    // Add the assignment to our array
    assignments.push(newAssignment);

    // Save assignments
    saveAssignments();

    // Update the webpage
    displayAssignments();

    // Clear the form
    form.reset();
});

/* Display saved assignments when the page opens */
displayAssignments();