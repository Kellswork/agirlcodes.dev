---
title: 'Build a CRUD Todo App with Vanilla JavaScript and Fetch API'
date: 11-01-2024
fullDate: Thursaday, 11 January 2024
tags: JavaScript
image: /posts-images/crud-fetch-api-frontend/todo-app-frontend-crud-vanilla-js-fetch-api.jpg
description: "This article will focus on building the frontend portion of a Todo App using Vanilla JavaScript and Fetch API. It's perfect for anyone interested in performing CRUD operations using Vanilla JavaScript and Fetch API"
url: '/todo-app-frontend-crud-vanilla-js-fetch-api'
---

In the previous article, we discussed setting up the [front end for a Golang Todo App](https://www.agirlcodes.dev/golang-setup-html-templates-and-static-assets). In this post, we will focus on building the frontend portion of a Todo App using Vanilla JavaScript and Fetch API.

This tutorial will guide you on how to create a Todo app frontend with Vanilla JavaScript and Fetch API. We will perform CRUD operations, including;

- creating a Todo,
- reading a list of Todo items,
- editing a Todo item from the list of displayed items,
- deleting an item from the list,
- and marking a Todo item as completed or not.

For those who prefer to work with **TypeScript**, I will create a TypeScript version that provides type-checking and safety toolings, preventing errors during data interaction and making the code less prone to errors. However, Vanilla JavaScript offers simplicity and a flexible experience, making it perfect for learning the fundamentals of web development.

Regardless of the technology you choose, the core concepts remain the same, and we will perform the same CRUD operations mentioned above and utilize the same technologies.. 

This post is perfect for anyone interested in performing CRUD operations using Vanilla JavaScript and Fetch API, even without setting up a Go server. We will use HTML, CSS, TypeScript, and JavaScript for the front-end development.


### What we will be building

<video class='video-container' src="/posts-images/crud-fetch-api-frontend/what-we-will-build.mp4" width="640" height="auto" controls></video>

### Project Setup

For instructions on setting up HTML templates and static assets (CSS, TypeScript) for a Go web server, refer to this [article](https://www.agirlcodes.dev/golang-setup-html-templates-and-static-assets).

We will write the JavaScript code inside the `script` tag in the HTML template. However, you can write yours in a separate `script.js` file and import it into the HTML file if that works better for you.

If you are new to coding, I'd advise you to follow the instructions and type the code yourself.

**HTML and CSS Boilerplate**

You can download the HTML and CSS files from this [GitHub repository](https://github.com/Kellswork/golang-todo-app/tree/feat/setup-html-template-and-asset-files), If you wish to use these files’ content.

### **Building the Frontend CRUD Functionality**

Note: `localhost:9000/todo` is from the local server we created in the Todo Golang Backend in the previous [article](https://www.agirlcodes.dev/build-todo-app-backend-golang-tutorial). Feel free to work with any API endpoint of your choice.

### Get and Display a list of todo items

**Make a Get Request with the Fetch API**

To make a GET request to the API endpoint, we create a `getTodos()` function. This function is responsible for making the HTTP GET request to `localhost:9000/todo` and fetching a list of all the todos from the specified API endpoint.

`/html/index.html`

```html
<script>
    const localhostAddress = "http://localhost:9000/todo";

  async function getTodos() {
        try {
          const response = await fetch(localhostAddress);
          const responseData = await response.json();
          return responseData.data;

        } catch (error) {
          console.error("Error:", error);
        }
      }
</script>
```

In the code above, we save the API endpoint in a string called `localhostAddress` so it can be easily reused. 

The `getTodos()` function uses the Fetch API to send the request, await the response, and then parses the response data as JSON. We return the data object in the `responseData` variable because that is the server response data object we need.

To confirm that you get the response object from the fetch request, you can `console.log` the `responseData` and call the `getTodos()` function. Don’t forget to restart your go server if using one.

![get-todos-fetch-api-call.jpg](/posts-images/crud-fetch-api-frontend/get-todos-fetch-api-call.jpg)

> **NOTE:** The way we access the todo items in the response (**responseData.data**) is specific to this example API. If you're using a different API, the response data might be structured differently.

**Displaying Todos in the DOM**

Now that we have created an asynchronous function for fetching all the todos, let's use the `getTodos()` function to fetch the list of todos from the API and display the items on the DOM. 

If you check the HTML structure, there’s an empty `div` element with ID `todos`. This element will serve as the container for dynamically displaying our todo items. The goal is to dynamically update this section based on the items retrieved from the API call.

To do this, we create an asynchronous function called `displayTodos`. This function will be responsible for dynamically rendering the todo items. Place the function below `getTodos()` .

```javascript
async function displayTodos() {
  const todoList = await getTodos();
  let todoListContainer = document.querySelector("#todos");

  if (todoList.length == 0) {
    todoListContainer.innerHTML += `
            <div class="todo">
                <span> You do not have any tasks </span>
            </div>
            `;
  } else {
    todoList.forEach((todo) => {
      todoListContainer.innerHTML += `
        <div class="todo">
            <span>${todo.title}</span>

            <div class="actions">
                <button class="edit">
                    <i class="fas fa-edit"></i>
                </button>
                 <button class="delete">
                <i class="far fa-trash-alt"></i>
                </button>
            <div>
            
        </div>
        `;
    });
  }
}
displayTodos();
```

In the code above, we call `getTodos()` to fetch a list of todo items and await the result. 

We use the `document.querySelector` method to find the HTML element with ID `todos` and store it in the `todoListContainer` variable.

Next, we check if the **todoList** is empty. If it is, we will update `todoListContainer.innerHTML` with a message informing the user that there are no tasks created yet.

If the **todoList** is not empty, we loop through the todoList to access each todo item.We generate an HTML structure for each todo item including the **todo title** and **action buttons** for **editing** and **deleting** a todo.  

We call the `displayTodos()` function to ensure that the list is displayed when the App loads. Depending on what is returned from your server, the DOM will update the screen with the HTML Todo structure list accordingly.

![display-todo-ui.jpg](/posts-images/crud-fetch-api-frontend/display-todo-ui.jpg)

### Creating a Todo

**Make a Post Request with Fetch API**

To add a Todo task, we must first create a function to make a POST request to the API for adding a Todo to the database.

We will create a function called `createTodo` to make this HTTP post request to the API endpoint using fetch API and with the user input(todo task ) as part of the request body because the API is expecting it.

Add this code below `getTodos` and before `displayTodos`.

```javascript
async function getTodos() {
  // code implementation
}

async function createTodo(data) {
  try {
    // send POST request with user input as the req body
    const response = await fetch(localhostAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result.message);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function displayTodos() {
  // code implementation
}
```

In the code above, we defined a function called `createTodo`. It uses the javascript fetch API to send a post request to the `localhostaddress`.

The `createTodo` function takes a data argument which is which is sent as part of the request body and converts it to a JSON string. 

We set the content type of the request header to "**application/json**" to indicate that the response body object will be in JSON format. 

To prevent the app from crashing due to an error, the code is wrapped in a try-catch block. If the response is successful, a success message is logged to the console.

**Create  Todos From the User Interface**

To allow users to add a new task from the app's user interface, we have an input box and a submit button.

```javascript
const localhostAddress = "http://localhost:9000/todo";
const newTodoInput = document.querySelector("#new-todo input");
let submitButton = document.querySelector("#submit");
```

We use the query selector to get the input element and save it in a constant called "**newtodoinput**". Similarly, we save the submit button in a constant called "**submitButton**".

Next, we will define an asynchronous function called `addTasks` that will be responsible for adding a new task to the user interface when the user clicks the submit button.

Add the following code below the `createTodo` function.

```javascript
async function createTodo() {
  // code implementation
}

async function addTask() {
  const data = { title: newTodoInput.value };
  await createTodo(data);
  displayTodos();
  newTodoInput.value = "";
}

async function displayTodos() {
  const todoList = await getTodos();
  let todoListContainer = document.querySelector("#todos");
  // rest of code implementation
}
displayTodos();

submitButton.addEventListener("click", () => addTask());
```

When a user clicks the submit button, the `addtask` function is called because we attached a click event listener to the submit button.

Inside the function, we create a data object with a `title` key and set its value to the user's input value.

We then call the `createTodo` function and pass the data object as a parameter to send a POST request to the server, sending the new task data to the backend.

We await the result and call `displayTodos` to refresh the DOM and display the newly created todo task if the request was successful. Finally, we clear the input field by setting `newtodoinput.value` to an empty string.

**Remember** to only access `newtodoinput.value` when you want to use it. Avoid adding `.value` at the end of the `newtodoinput` constant, as it will result in an empty input value.

Lastly, attach an event listener to the `submitButton` to call the `addTasks` function when clicked.

<video class='video-container' src="/posts-images/crud-fetch-api-frontend/todolist-container-duplicating.mp4" width="640" height="auto" controls></video>


**Update `displayTodo` function to fix duplication on the DOM**

If you try adding a Task, you will notice the values are duplicated on the DOM.

To avoid duplicated values on the DOM when adding a task, clear the todoListContainer element before populating it with new data. To do this, add `todoListContainer.innerHTML = "";` to the **displayTodos()** function.

```javascript
async function createTodo() {
  // code implementation
}

async function addTask() {
  const data = { title: newTodoInput.value };
  await createTodo(data);
  displayTodos();
  newTodoInput.value = "";
}

async function displayTodos() {
  const todoList = await getTodos();
  let todoListContainer = document.querySelector("#todos");
  todoListContainer.innerHTML = "";
  // rest of code implementation
}
displayTodos();

submitButton.addEventListener("click", () => addTask());
```

With these additions, users can now easily add tasks from the app's user interface.

To view changes, compile the file `tsc static/script.ts` and restart the Go server if using one.

<video class='video-container' src="/posts-images/crud-fetch-api-frontend/create-todo-no-duplicate.mp4" width="640" height="auto" controls></video>

### Deleting a Todo

**Delete Todo with Fetch API and Vanilla JavaScript**

When you want to delete a task from the user interface, you need to send a DELETE request to the API endpoint. To create this functionality, we define a “**deleteTodo**” asynchronous function. This function will be responsible for sending a **HTTP DELETE** request to the endpoint URL, along with the ID of the task you want to delete.

Place the `deleteTodo` function after the `createTodo` function but before the `Addtask` function.

```javascript
async function createTodo() {
  // code implementation
}

async function deleteTodo(TodoID) {
  try {
    const response = await fetch(`${localhostAddress}/${TodoID}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log("Success:", result.message);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addTask() {
  // code implementation
}
```

The **deleteTodo** function takes in a parameter **TodoID**, which is the ID of the tasks you want to delete.

To catch any errors that occur and log them gracefully to the console, we place this function call in a **try-catch** block.

We use the **Fetch API** to send an HTTP DELETE request to **localhostAdress** with the ID in the URL. We then **await** the response from the request and parse it as JSON. 

If the request was successful, we console log the success message returned from the server. In this case, we do not return the result because we don’t need it.

**Delete Todo Item from the User Interface**

To delete a Todo item from the user interface, we need to manipulate the DOM.

As a quick recap, When we created the **todoContainer.innerHTML** to display the list of Todos, we also created an **action button** for **deleting** each Todo task. We will now delve deeper into this.

To add functionality to the delete button action,  we define a `deleteTaskButton` function below `displayTodos()` function. 

```javascript
function deleteTaskButton() {
  const deleteTodoButtons = document.querySelectorAll(".delete");

  for (const deleteButton of deleteTodoButtons) {

    deleteButton.onclick = async function () {
      const todoID = deleteButton.getAttribute("data-id");
      await deleteTodo(todoID);
      displayTodos();
    };
  }
}
```

Inside the function, we use the **queryselectorAll** to select all the elements on the DOM with the class name "**delete**". We then  loop through the `deleteTodoButtons` node list and assign an **onlick** **evenlister** to each button.

**When a user clicks the delete icon button:**

We create a constant **todoID** that we will use to access the ID for each todo item. To get the **TodoID**, we update the button element with a **data-id** attribute.

If you check the code snippet below, you will see I updated the button element with class ’**delete**’ to show how to add the data-id attribute. 

```javascript
async function displayTodos() {

  <button data-id=${todo.id} class="delete">
  // rest of code...
}
```

Next, we assign the `todo.id` as the `data-id` attribute value. which is one of the properties of a **todo** in the `**todolist**`.

To get the **`todo.id`** saved in the **`data-id`** attribute, we use the `getAttribute` method and store the value in a **`todoID`**.

Next, we call the **deleteTodo** function and pass in the **todoID** as a parameter to delete the item and await the result. After the item is deleted, we refresh the todo list to show the updated list.

Finally, we call the `deleteTaskButton()` function inside `displayTodos()` so that it is available to `displayTodos` when a user clicks the delete button.

```javascript
async function displayTodos() {
  // code implementation ...

  deleteTaskButton();
}
displayTodos();
```

To view changes, compile the file `tsc static/script.ts` and restart the Go server if using one.

<video class='video-container' src="/posts-images/crud-fetch-api-frontend/delete-todo.mp4" width="640" height="auto" controls></video>

### Update a Todo

To update a To-do item, we will be implementing two forms of editing.

1. users will be able to edit the To-do item title.
2. users will be able to mark a To-do item as completed or not.

#### Users will be able to edit the To-do item title.

To edit the To-do item title, we will start by defining an asynchronous function that will make an API call to update the To-do item in the database. This function will take a TodoID and the data object to be passed as the parameters and part of the request body.

Place the code below `deletTodo` and `addTask` function

```javascript
async function deletTodo() {
  // code implementation
}

async function updateTodo(id, data) {
  try {
    const response = await fetch(`${localhostAddress}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addTask() {
  // code implementation
}
```

After creating the `updateTodo` async function for updating a To-do Item HTTP Request,  When a user clicks the edit button, we want to load the To-do item title into the input box. To achieve this, we need to create a variable to track whether the user is currently editing a To-do item or not. This is necessary because we are using the same input box for both editing and adding new items to the list.

At the beginning of the file where you defined your variable, create `isEditingTask` and set it to `false`. Also create an `editButtonTodoID` variable, we will use it to store the id of the todo we want to edit.

```javascript
const submitButton = document.querySelector("#submit");

let isEditingTask = false;
let editButtonTodoID = '';
```

 Next, navigate to the `displayTodos` function and add the data-id attribute to  `<button class=edit>`. Also, add a `editTaskTitleButton` below `deleteTaskButton` in the displayTodos function.

```javascript
async function displayTodos() {
  <button data-id=${todo.id} class="edit">
  // code that lists the todo...

  deleteTaskButton();
  editTaskTitleButton();
}
```

Now, let’s define a `editTaskTitleButton` function. Place this code below `deletTaskButton()`

```javascript
function deleteTaskButton() {
	// ...
}

function editTaskTitleButton() {
  const editTodoTitleButtons = document.querySelectorAll(".edit");

  for (const editButton of editTodoTitleButtons) {
    const todoName = editButton.parentNode.parentNode.children[0];

    editButton.onclick = async function () {
      newTodoInput.value = todoName.innerText;
      submitButton.innerHTML = "Edit";
      isEditingTask = true;

      editButtonTodoID = editButton.getAttribute("data-id");
    };
  }
}
```

In the code above, we use the  `document.querySelectorAll` to fetch all the button elements with `class='edit'`. we save the NodeList element in a variable called `editTodoTitleButtons`. Next, we loop through the list to access the to-do button.

To access the todo item title, we can use the `editButton.parentNode.parentNode.children[0]` code. This code moves up the DOM hierarchy, allowing us to select the first child element of the second parent. We store this element in the `todoName` variable, giving us access to the inner text representing the title of the todo item.

Now that we can access the todo item title in the DOM, we want to load the text into the input box. To do that, we attach an `onclick` event listener to the “**edit”** button so when a user clicks on the edit button, we:

- we set the input box value to the todo item title text
- change the submit  button text to `edit` (this is optional)
- set `isEditingTask` variable to true
- get the todo ID from the `data-id` attribute and save it in the `editButtonTodoID` variable we defined at the top.

Your app should be able to load a todo title into the input box when you click on it now.

<video class='video-container' src="/posts-images/crud-fetch-api-frontend/edit-button-load-title.mp4" width="640" height="auto" controls></video>

Next, let's create an `edit tasks` function to handle editing a todo item on the UI. For now, we can only load the text into the input field. Place the code below `addTask()` function.

```javascript
async function addTask() {
  // code implementation
}

async function editTask() {
  const data = { title: newTodoInput.value, completed: false };

  if (isEditingTask) await updateTodo(editButtonTodoID, data);
  displayTodos();

  newTodoInput.value = "";
  isEditingTask = false;
  submitButton.innerHTML = "Add";
}

async function displayTodos() {
  // code implementation
}
```

In the code above, we create a data object with the title and completed property. The title is set to `newTodoInput.value`, which is whatever is in the input box when the user clicks the submit button. We set `completed` to false for now because the API expects a completed property to be present; later, we will update the value for the `completed` prop accordingly.

Next, we check to see if `isEditingTask` is true, which means the user is editing a task, remember we set `isEditingTask` to `true` when a user clicks the edit button. We call the `updateTodo` function and pass in the `TodoID` and data object as arguments. We `await` the result and refresh the to-do item list when done. Next, clear the input field and set `isEditingTask` to false to indicate we are done. Finally, update the submit button text back to "**Add**".

Lastly, update the submit button event listener to call `editTask` function if `isEditingTask` is true.

```javascript
submitButton.addEventListener('click', () => isEditingTask ? editTask() : addTask())
```

To view changes, restart the Go server if using one.

<video class='video-container' src="/posts-images/crud-fetch-api-frontend/edit-todo-title-text.mp4" width="640" height="auto" controls></video>

#### Users will be able to mark a To-do item as completed.

To implement this functionality, the process involves two main steps:

1. Styling the to-do title text to indicate whether an item is marked as completed.
2. Updating the `completed` property within the **data** object to reflect the item's status on the server

**Styling the to-do title text to indicate whether an item is marked as completed**

First, we want to style the todo title text to visually indicate whether an item is marked as completed or not. Update the HTML structure within the `displayTodos` function:

```html
<div class="todo">
  <span
    id="todoname"
    style="text-decoration:${todo.completed ? 'line-through' : ''}"
    data-iscomplete="${todo.completed}"
    data-id="${todo.id}"
  >
    ${todo.title}
  </span>
   ...
</div>
```

In the code above:

- We use the **`style`** attribute to set the **`text-decoration`** property of the **`todo title span`** element.
- If **`todo.completed`** is **`true`**, we set **`text-decoration: line-through`** to visually strike through the text, indicating that the item is completed.
- If **`todo.completed`** is **`false`**, no **`text-decoration`** is applied.

We also add two custom attributes, **`data-iscomplete`** and **`data-id`**, to store the **`completed`** status and the ID for each todo item. These attributes will help us access and update the values later.

We also added an HTML id attribute to make it easy to fetch the list of all the to-do titles displayed on the DOM.

**Toggle Todo Item as Completed or Not**

Next, we want to allow users to click on a todo item to toggle its completion status. To achieve this, add the following code. below `editTaskTitleButton()` function. 

Also call the `toggleTaskCompletion` inside the `dislayTodos` function like we did for `deleteTaskButton` and `editTaskTiltleButton` 

```javascript
async function displayTodos() {
  <button data-id=${todo.id} class="edit">
  // code that lists the todo...

	deleteTaskButton();
	editTaskTitleButton();
	toggleTaskCompletion();
}

function deleteTaskButton() {
  // code implementation
}

function editTaskTitleButton() {
  // code implementation
}

function toggleTaskCompletion() {
  const editTaskCompleted = document.querySelectorAll("#todoname");

  for (const task of editTaskCompleted) {
    task.onclick = async function () {
      const isTaskDone = JSON.parse(task.getAttribute("data-iscomplete"));
      const todoID = task.getAttribute("data-id");

      const data = { title: task.innerText, completed: !isTaskDone };
      await updateTodo(todoID, data);
      displayTodos();
    };
  }
}
```

In the code:

- we fetch all HTML elements with ID `#todoname` and store them in a  `todoTitleEmlement` variable.
- We iterate through the list of HTML elements to get access to the `data-iscomplete` and `data-id` attribute for each element.

When a user clicks on a todo item title, the following actions occur:

- We use **`JSON.parse`** to convert the **`data-iscomplete`** attribute from a string to a boolean value.
- We use the `getAttribute` method to fetch the `data-iscomplete` and `data-id` values and store them in `isTaskDone` and `todoID` variable.
- We create a new `data` object with the `title` property set to the text of the clicked todo item text.
- we set  `completed` property to `!istaskDone` to toggle the value of the completed status between `true` and `false`.
- We call the `updateTodo` function with the ID and `data` object  as arguments to update the `completed` status and await the result.
- Finally, we call **`displayTodos`** to refresh the todo list and display the changes.

 

This completes the functionality of marking a Todo item as completed or not and updates the UI accordingly.

Your App should look like this;

<video class='video-container' src="/posts-images/crud-fetch-api-frontend/mark-item-as-completed.mp4" width="640" height="auto" controls></video>

**Update the `completed` property when editing the To-do item title.**

In our previous work, specifically within the **`editTask`** function, we focused on updating the todo title. At that time, we hardcoded the **`completed`** property to **`false`**. 

Now, we aim to improve the code by dynamically setting the **`completed`** property to the value stored in the **`data-iscomplete`** property.

Here are the steps:

1. **Create an `isComplete` Variable**

To store the value from the **`data-iscomplete`** property, we create an **`isComplete`** variable and set it to **`false`**:

```javascript
let isEditingTask = false;
let todoID = ''
let isComplete = false
```

1. **Update the `editButton.onclick` function inside `editTaskTitleButton()`**

Within the **`editButton.onclick`** function, we need to set the **`isComplete`** variable to the value of the **`data-iscomplete`** property. This is done when a user clicks on the **edit** button:

```javascript
editButton.onclick = async function () {
  newTodoInput.value = todoName.innerText;
  submitButton.innerHTML = "Edit";
  isEditingTask = true;

  editButtonTodoID = editButton.getAttribute("data-id");
  isComplete = JSON.parse(todoName.getAttribute("data-iscomplete"));
};
```

Now, when a user clicks the edit button, it updates the **`isComplete`** variable with the value from the **`data-iscomplete`** attribute. `JSON.Parse` converts it from a `string` to a `boolean`.

Lastly, In the **`editTask`** function, where we set up the **`data`** object to send to the server, update the  **`completed`** property of the **`data`** object with the value of the **`isComplete`** variable.

```javascript
async function editTask() {
  const data = { title: newTodoInput.value, completed: isComplete };

  if (isEditingTask) await updateTodo(editButtonTodoID, data);
  displayTodos();

  newTodoInput.value = "";
  isEditingTask = false;
  submitButton.innerHTML = "Add";
}
```

This ensures that when you edit a todo item, the **`completed`** property retains its previous value, either **`true`** or `false` based on `data-iscomplete` attribute.

With these changes, your code effectively handles marking todo items as done and updating the **`completed`** attribute when editing a todo item.

<video class='video-container' src="/posts-images/crud-fetch-api-frontend/edit-title-and-mark-todo.mp4" width="640" height="auto" controls></video

> View the complete code on [GitHub](https://github.com/Kellswork/golang-todo-app/tree/feat/frontend-with-vanilla-js)


### Conclusion

In this tutorial, we've built a Todo app's frontend using Vanilla JavaScript and the Fetch API. We've covered all the CRUD operations:

1. Fetched and displayed todo items from the API.
2. Enabled users to add new tasks and updated the UI accordingly.
3. Implemented the ability to delete tasks from the UI.
4. Enhanced the editing feature, allowing both title updates and marking tasks as completed.
5. Styled completed tasks by toggling the "text-decoration" CSS property.

Stay tuned for an upcoming TypeScript version of this tutorial.

This guide covers key frontend development skills, including API interaction, CRUD operations, and dynamic user interface creation. Building a Todo app is an ideal starting point for web development, offering insights and skills for broader applications. 

I hope you found this article helpful ❤️

Please feel free to contact me via email at kells@agirlcodes.dev or drop a comment if you have any questions or feedback or need help with any part of the tutorial.

*Recommended Reads*
- [Build a Todo App backend with Golang](https://www.agirlcodes.dev/build-todo-app-backend-golang-tutorial).
- [Setup HTML Templates and Static Assets in Golang](https://www.agirlcodes.dev/golang-setup-html-templates-and-static-assets).