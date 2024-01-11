---
title: 'Build a Golang Todo App Backend: A Step-by-Step Guide'
date: 15-12-2023
fullDate: Friday, 15 December 2023
tags: Go
image: /posts-images/golang-todo-app/golang-todo-app-tutorial.jpg
description: "Learn how to build a Todo app backend with Golang.
You will learn how to build CRUD REST API endpoints, connect to a MongoDB database with Docker, create a server, shut down the server gracefully and more; It is beginner-friendly."
url: '/build-todo-app-backend-golang-tutorial'
---

In this tutorial, you will learn how to build a **Todo app backend with Golang**.

If you are new to programming or a Dev who desires to learn Golang, this is a way you can slowly introduce yourself to the language and understand the basics and how building APIs work in Go.

It is beginner-friendly, and I explain the function of each line of code so you can understand what the code does. You will learn how to build CRUD REST API endpoints, connect to a MongoDB database with Docker, create a server and shut down the server gracefully, test the APIs on Postman and consume the APIs in the Frontend using Go html/templates(HTML, CSS and JavaScript).

## Prerequisite

You don’t need to know Golang, but I advise you to go through  [A Tour of Go](https://go.dev/tour/list) to understand how **variables**, **loops** and **if statements** work.

To follow along,

1. Install [Docker](https://docs.docker.com/engine/install/) and [Golang](https://go.dev/doc/install). Docker is for the database provision.
2. You have gone through the BASICS part on [A Tour of Go](https://go.dev/tour/list).

## What we will build

- REST API endpoints: Create, Get, Update, and Delete API endpoints for the To-do App.
- Use Mongo DB for the database connection and storage.
- Postman to test the endpoints

## Build Todo APIs in these Steps;

### 1. Set up the project folder and import packages needed.

To start, create a folder for the Todo App backend. Open the project folder in a terminal and run the command below.

Replace `<github-username>` with your GitHub username and `<folder-name>` with the project folder name you created.

```go
go mod init github.com/<github-username>/<folder-name>

// e.g github.com/kellswork/golang-todo-app
```

The code above creates a `go.mod` file which is similar to a package.json file in JavaScript projects.

The `main.go` file will serve as the entry point to the project. In this project, we will write the whole code in the `main.go` file.

#### Download the packages we need

To download packages, open the project folder in a terminal and run the commands one after the other. 

The `go.mod` file shows a list of all the packages downloaded.

```go
go get "github.com/go-chi/chi/v5"

go get "github.com/thedevsaddam/renderer"

go get go.mongodb.org/mongo-driver/mongo

go get go.mongodb.org/mongo-driver/bson
```

[go-chi](https://github.com/go-chi/chi): is a lightweight, idiomatic and composable router for building Go HTTP services.

[thedevsaddam/render](http://github.com/thedevsaddam/renderer): Simple, lightweight and faster response (JSON, JSONP, XML, YAML, HTML, File) rendering package for Go

[mongodb.org/mongo-driver](https://github.com/mongodb/mongo-go-driver): The MongoDB supported driver for Go.

#### Import downloaded packages into the main.go file

Open the project folder in VS Code or any editor of choice and create a `main.go` file.

Your project file structure should look like this;

![result](/posts-images/golang-todo-app/result.jpg)

Note: `go.mod` and `go.sum` files are auto-generated.

Import the downloaded packages and some in-built Go packages we require to build the todo app backend. VS Code will import other in-built Go packages we are yet to import while building the endpoints. If the package is unavailable, the linter will prompt you to download it.

```go
package main

import (
	"context"
  "fmt"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/thedevsaddam/renderer"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)
```

Note that when you save, **Go** editor will delete unused imports. So these imports will disappear if you save without using them.

#### Create variables to store values

Create a pointer variable `rnd` of type `render.Render`, `client` of type `mongo.Client` and `db` of type `mongo.Database`. Also, define const variables to store the database name and collection name. 

```go
var rnd *renderer.Render
var client *mongo.Client
var db *mongo.Database

const (
	dbName         string = "golang-todo"
	collectionName string = "todo"
)
```

To learn more about pointers, this [Tutorial](https://www.programiz.com/golang/pointers) explains Pointers in Go clearly.

### 2. Create a Struct Type

Go is a typed language, and struct is a collection of user-defined fields.

In the code below, we created a **TodoModel** struct type that we will use to store the todo data in the MongoDB database.

We also created a **Todo** struct type that matches the TODO entries that the Frontend will display.

Why? Because MongoDB stores data in **bson** format, we need to convert the **bson** data format to **JSON** data format for the browser to read the data.

```go
type (
	TodoModel struct {
		ID        primitive.ObjectID `bson:"id,omitempty"`
		Title     string             `bson:"title"`
		Completed bool               `bson:"completed"`
		CreatedAt time.Time          `bson:"created_at"`
	}

	Todo struct {
		ID        string    `json:"id"`
		Title     string    `json:"title"`
		Completed bool      `json:"completed"`
		CreatedAt time.Time `json:"created_at"`
	}
)
```

Struct tags like `json:"id"` specifies the field's name, in this case `id` for when the struct's contents are serialised into JSON.

### 3. Create an init function and connect to a database

We use the init function to set up and initialise the database and To create a new renderer, `rnd`. In Go,the init function always runs before any other function in a package; in this case, it will run before `func main`.

```go
func init() {
	fmt.Println("init function running")

	rnd = renderer.New()
	var err error

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	checkError(err)

	err = client.Ping(ctx, readpref.Primary())
	checkError(err)

	db = client.Database(dbName)
}
```

In the code above:

We added a print line to indicate the `go init` function is running.

We created a database connection to a MongoDB database server and stored the result in the **`client`** variable.

If an error occurs and the database connection is unsuccessful, `checkError` will stop the app and log the error to the console.

If the connection is successful, we create a new database, pass in the **`dbName`** const as the database name and save the value in the **`db`** variable.

`checkError` is a function that has not yet been defined, so Go linter will show an undefined error.

#### Provision and Connect to the Database with Docker

Note you don’t have to use Docker for this step. There are other ways to create a MongoDB database, but for ease, I will do this in Docker. Docker provides a fast and easy way to have a database up and running.

**Setup your database in the following steps:**

1. Create a new folder and name it **dependencies**. This folder can be in the same directory as your Todo App.
2. Open a terminal, `cd` into the dependencies folder, create another folder and call it `mongo`.
3. Inside the `mongo` folder, create a file and name it `docker-compose.yml`.
4. open the `docker-compose.yml` file in your code editor and paste the code below.
5. don’t forget to replace the placeholder with your database name on the **-MONGO_INITDB_DATABASE=<db-name>** environment variable.

```YAML
version: '3.8'
services:
  db:
    image: mongo
    restart: always
    environment:
      - MONGO_INITDB_DATABASE=<db-name>
    ports:
      - 27017:27017
    volumes: 
      - $PWD/data/db:/data/db
volumes:
  db:
    driver: local	
```

### 4.  Define `checkError` function

The checkError function is used to check for errors, as seen in the init function. For this tutorial, we use `log.fatal` to stop the app and log the error to the console. It takes an `( err Error)` parameter. When `err` is not empty, the function will log the error message on the console and terminate immediately.

Add this code after the init function.

```go
func checkError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
```

### 5. Create and Connect to a Go Server

Go has an HTTP package that provides HTTP client and server implementations. 

Create `func main()` between `func init()` and `checkerror()`. 

Add the code below to connect to a server.

```go
func main() {
	server := &http.Server{
		Addr:         ":9000",
		Handler:      chi.NewRouter(),
		ReadTimeout:  60 * time.Second,
		WriteTimeout: 60 * time.Second,
	}

	// start the server
	fmt.Println("Server started on port", 9000)
	if err := server.ListenAndServe(); err != nil {
		log.Printf("listen:%s\n", err)

	}
}
```

In the code above, we created a `server` variable and assigned a `&http.Server` with a port number of `“:9000”` and a new **chi router** handler `chi.NewRouter()`.
`ListenAndServe` starts the HTTP server with the port address and router handler.
At this point, you can build and run `main.go` to see that your server has been started on `port:9000`.

#### Connect to the Database and Run the Server

- make sure you have the Docker Desktop app open
- cd into the `mongo` folder we created earlier and run `docker compose up` in the terminal.
- A MongoDB container will be created for you to use for the database storage.
- Go back to the todo app project folder, open the folder in the terminal and run `go build`.
- After it builds successfully with no errors, run **`go run main.go`** to start the server.
- If no database connection error is thrown, then you should see a log message from the server.

```bash
init function running
Server started on port 9000
```

### 6. Shutdown the server gracefully

shutting down the server gracefully, while not compulsory is recommended. Shutting down the server gracefully allows the server to finish handling any active request before closing all connections. Go provides an **http.Server.Shutdown** function for this.

Update the `func main` function to include the code for shutting down the server.

```go
func main() {
	server := &http.Server{
		Addr:         ":9000",
		Handler:      chi.NewRouter(),
		ReadTimeout:  60 * time.Second,
		WriteTimeout: 60 * time.Second,
	}

	// create a channel to receive signal
	stopChan := make(chan os.Signal, 1)
	signal.Notify(stopChan, os.Interrupt)

	// start the server in a separate go routine.
	go func() {
		fmt.Println("Server started on port", 9000)
		if err := server.ListenAndServe(); err != nil {
			log.Printf("listen:%s\n", err)
		}
	}()

	// wait for a signal to shut down the server
	sig := <-stopChan
	log.Printf("signal recieved: %v\n", sig)

	// disconnect mongo client from the database
	if err := client.Disconnect(context.Background()); err != nil {
		panic(err)
	}
	// create a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// shutdown the server gracefully
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server shutdown failed: %v\n", err)
	}
	log.Println("Server shutdown gracefully")
}
```

We created a `stopChan` variable of type `channel` to receive only an `os.Signal` with 1 capacity.

`signal.Notify` will send an `os.Interrupt` signal to `stopChan` when it receives an interrupt signal (ie. pressing **control+c**).

we create a `context` with a timeout and call the `Shutdown()` method on the server.

Press `control+c` to see the messages printed on the console.

### 7. Create Router and Route Handlers for Home and Todo

An HTTP router listens for HTTP requests and forwards the request to the appropriate handler functions.

Add this code at the top of the `func main` , directly above the `server` variable.

```go
func main() {

	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Get("/", homeHandler)
	router.Mount("/todo", todoHandlers())

	server := &http.Server{
```

In the code above;

- we define a new chi Router variable `router`.
- we use `middleware.Logger` from `chi` to log the HTTP URLs Requests in the console.
- `router.Get` to create a home router and `router.Mount` to create a `todo` sub-router.
- `Mount` attaches another **http.Handler** along **./pattern/***

Replace `chi.NewRouter()`  with `router` variable in the `server` definition as shown below.

```go
server := &http.Server{
		Addr:         ":9000",
		Handler:      router,
		ReadTimeout:  60 * time.Second,
		WriteTimeout: 60 * time.Second,
	}
```

### 8. Create a Group Route for Todo Routers

Next, we define a **todoHandlers()** function that groups all the route API endpoints needed for the **Todo** app. It handles all HTTP requests directed at **"/todo"**.

Place this code between the **func main** and the **func** **checkError**.

```go
func todoHandlers() http.Handler {
	router := chi.NewRouter()
	router.Group(func(r chi.Router) {
		r.Get("/", getTodos)
		r.Post("/", createTodo)
		r.Put("/{id}", updateTodo)
		r.Delete("/{id}", deleteTodo)
	})
	return router
}
```

We are done with the database and server setup. Next, let's define all the Route Handlers for the different API endpoints.

### 9. Define the homeHandler Function

Create a **func Handler** function and place it between `func init` and `func main` in the **main.go** file.

Create a **readme file** at the root of the project to match the `filePath` variable.

```go
func homeHandler(rw http.ResponseWriter, r *http.Request) {
	filePath := "./README.md"
	err := rnd.FileView(rw, http.StatusOK, filePath, "readme.md")
	checkError(err)
}
```

In the code above, we created a handler function called `homeHandler` that displays the content of the **README.md** file when a browser HTTP request is made to `"localhost:9000/"`.  This will serve as the home page.

A handler in Go is a function that takes 2 signature parameters (http.ResponseWriter, http.Request).

- **http.ResponseWriter** handles the HTTP response to the client. In this example, we are sending a **README.md** text file as a response.
- **http.Request** handles all incoming requests from the browser to **`"**localhost:9000/**"`.It contains all the information about the HTTP request including the headers and URL.
- **rnd.FileView** renders the readme file.
- **http.StatusOK** An 200 HTTP status code, indicates that the request was successful.
- **checkError** will stop the app and log the error if the response failed for any reason.

Later, we will update rendered readme file with Todo App Frontend built with(HTML,CSS and javascript) [Go html/Template](https://pkg.go.dev/html/template).

### 10. Define the CRUD TodoHandlers Function

#### Get Todos

This function handles all HTTP Get requests for `"localhost:9000/todo"` It fetches the TODO entries from the database and sends them as a JSON response.

```go
func getTodos(rw http.ResponseWriter, r *http.Request) {
	var todoListFromDB = []TodoModel{}
	filter := bson.D{}

	cursor, err := db.Collection(collectionName).Find(context.Background(), filter)
	
	if err != nil {
		log.Printf("failed to fetch todo records from the db: %v\n", err.Error())
		rnd.JSON(rw, http.StatusBadRequest, renderer.M{
			"message": "Could not fetch the todo collection",
			"error":   err.Error(),
		})

		return
	}
}
```


> 💡 import "[go.mongodb.org/mongo-driver/bson](http://go.mongodb.org/mongo-driver/bson)" for the **undefined: bson** error.


In the code above, we declare a variable `todoListFromDB` as an empty list and of type **TodoModel**.

Next, we create a `filter` variable without any conditions, this way all data in a collection will be sent back. 

`db.Collection(collectionName).Find(context.Background(), filter)` executes a database query to retrieve the TODO entries based on the provided filter. The retrieved data is stored in the `cursor` variable. If an error occurred while retrieving the TODO entries, we return a JSON response object with the error message. 

After retrieving the data successfully from the database, We declare another variable `todoList`  and assign an empty list with type `Todo`. `todoList` is created to convert and store TODO entries fetched from the DB from `bson` to `JSON` format.

```go
	func getTodos(rw http.ResponseWriter, r *http.Request) {
	...

	todoList := []Todo{}
	if err = cursor.All(context.Background(), &todoListFromDB); err != nil {
		checkError(err)
	}

// loop through the database list, convert TodoModel to JSON and append to the todoList array.
	for _, td := range todoListFromDB {
		todoList = append(todoList, Todo{
			ID:        td.ID.Hex(),
			Title:     td.Title,
			Completed: td.Completed,
			CreatedAt: td.CreatedAt,
		})
	}
	rnd.JSON(rw, http.StatusOK, GetTodoResponse{
		Message: "All todos retrieved",
		Data:    todoList,
	})

}
```

In the code above, the `todoListFromDB` is iterated over using a **for loop** with the blank identifier since we don't need the index value. The loop converts each `TodoModel type` TODO entry in `todoListFromDB` to a `Todo` type and appends the converted TODO entry  to the `todoList`.

I have created a custom type called `GetTodoResponse` to precisely define the structure of the JSON response data returned.

To add this custom type renderer, update  `type` to include the `GetTodoResponse` struct type. 

Creating a JSON response struct type provides a structured way to organise the data that will be sent as a JSON response from the server.

```go
type (
	...

	GetTodoResponse struct {
		Message string `json:"message"`
		Data    []Todo `json:"data"`
	}
)
```

If the get request is successful, we return a JSON response with a message and the Todo items data as shown above.

#### Create(POST) Todo

This function handles all HTTP POST requests for `"localhost:9000/todo"` . It processes the client’s input and creates and stores a new TODO entry  in the database. 

Let’s create a custom struct type `CreateTodo` for the request body. The only field the user fills is the `Title` field. update  `type`  to include `createTodo` struct.

```go
type (
	// ...previous structs

	CreateTodo struct {
		Title string `json:"title"`
	}
)
```

Create a `func CreateTodo` function handler. Inside the function, create a `todo` variable of type `CreatTodo` to store the user input sent through the request body.

`json.NewDecoder(r.body)Decode(&todo)` decodes the input sent in the request body. If an error occurrs and it fails to decode the response body, we return a JSON response with a 400(Bad Request) HTTP status code and an error message.

```go
func createTodo(rw http.ResponseWriter, r *http.Request) {

	var todoReq CreateTodo

	if err := json.NewDecoder(r.Body).Decode(&todoRequestBody); err != nil {
		log.Printf("failed to decode json data: %v\n", err.Error())
		rnd.JSON(rw, http.StatusBadRequest, renderer.M{
			"message": "could not decode data",
		})
		return
	}

	if todoReq.Title == "" {
		log.Println("no title added to response body")
		rnd.JSON(rw, http.StatusBadRequest, renderer.M{
			"message": "please add a title",
		})
		return
	}
```

After decoding the response body successfully, we check if the `title` field data is an empty string. If true, we return a JSON response with a 400(Bad Request) HTTP status code and an error message indicating the `title` field cannot be empty.

Now we have validated the client is sending the correct data in the request body, create a `todoModel` variable of type `TodoModel` and set the **Title field** to `todoRequestBo.Title`. We pass the `todoModel` into the `db.Collection(collectionName).InsertOne(r.Context(), todoModel)` . This inserts the `todoModel` into the database.

```go
	// create a TodoModel for adding a todo to the database
	todoModel := TodoModel{
		ID:        primitive.NewObjectID(),
		Title:     todoReq.Title,
		Completed: false,
		CreatedAt: time.Now(),
	}

	// add the todo to the database
	data, err := db.Collection(collectionName).InsertOne(r.Context(), todoModel)
	if err != nil {
		log.Printf("failed to insert data into the database: %v\n", err.Error())
		rnd.JSON(rw, http.StatusInternalServerError, renderer.M{
			"message": "Failed to insert data into the database",
			"error":   err.Error(),
		})
		return
	}
	rnd.JSON(rw, http.StatusCreated, renderer.M{
		"message": "Todo created successfully",
		"ID":      data.InsertedID,
	})
}
```

If inserting `todoModel` into the database fails, we return a JSON response with a 500(Internal Server Error) HTTP status code and an error message indicating the insertion failed due to a database error.

If the database insertion was successful, we return a JSON response with a 201(Created)HTTP status code, a success message and the newly created TODO item unique ID.

#### Update(PUT) Todo

This function handles all HTTP PUT requests for `"localhost:9000/todo/:id"`. It processes the client's input request to update some TODO entry fields stored in the database for the unique ID provided. In this case, we will be updating the `title` and `completed` field.

Let’s create a custom struct type `UpdateTodo` for the request body. The only fields the user fills are the `Title` and `Completed`field.

```go
type (
	// ...previous structs

UpdateTodo struct {
		Title     string `json:"title"`
		Completed bool   `json:"completed"`
	}
)
```

Create a `func updateTodo` handler. 

```go
func updateTodo(rw http.ResponseWriter, r *http.Request) {
	// get the id from the url params
	id := strings.TrimSpace(chi.URLParam(r, "id"))

	res, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("the id param is not a valid hex value: %v\n", err.Error())
		rnd.JSON(rw, http.StatusBadRequest, renderer.M{
			"message": "The id is invalid",
			"error":   err.Error(),
		})
		return
	}
```

In the code above, we get the ID parameter from the  URL path using `chi.URLParam(r, "id")`. we check if the ID is a valid hex value because the ID in the database is stored as a hex value. Next, we use `primitive.ObjectIDFromHex(id)` to convert the ID from `hex` to `primitive.ObjectID` because that is how the `ID` is stored in the database. `primitive.ObjectIDFromHex(id)` returns two values `res` and `err`. 

If `err` is not empty, log the error to the console, and return a JSON response with a 400 (bad request) HTTP status code and an error message.

If `res` is not empty, the conversion was successful.  Next, we decode the request body and validate that the JSON data sent by the client is valid. 

Next, we create a `updateTodoReq` variable of type `UpdateTodo` to store the user input sent through the request body.

```go
 var updateTodoReq UpdateTodo

	if err := json.NewDecoder(r.Body).Decode(&updateTodoReq); err != nil {
		log.Printf("failed to decode the json response body data: %v\n", err.Error())
		rnd.JSON(rw, http.StatusBadRequest, err.Error())
	}
	if updateTodoReq.Title == "" {
		rnd.JSON(rw, http.StatusBadRequest, renderer.M{
			"message": "Title cannot be empty",
		})
		return
	}
```

If decoding the JSON was successful, We store the decoded JSON data in `updateTodoReq` .

Next, check that the `title` field in `updateTodoReq` is not empty and return a JSON response if it is.

Having validated that the client provided a valid **ID** and non-empty fields, we define a `filter` variable that takes `res` as the ID. it will locate the specific TODO entry in the database with that ID and update it.

```go
// update the todo in the database
	filter := bson.M{"id": res}
	update := bson.M{"$set": bson.M{"title": updateTodoReq.Title, "completed": updateTodoReq.Completed}}
	data, err := db.Collection(collectionName).UpdateOne(r.Context(), filter, update)

	if err != nil {
		log.Printf("failed to update db collection: %v\n", err.Error())
		rnd.JSON(rw, http.StatusInternalServerError, renderer.M{
			"message": "Failed to update data in the database",
			"error":   err.Error(),
		})
		return
	}
	rnd.JSON(rw, http.StatusOK, renderer.M{
		"message": "Todo updated successfully",
		"data":    data.ModifiedCount,
	})
}
```

We create an `update` variable and set the value of the `title` and `completed` fields to the data provided by the client saved in `updateTodoReq`.

`db.Collection(collectionName).UpdateOne(r.Context(), filter, update)` will fetch the data with the given **ID** and update the **title** and **completed** fields data.

If an error occurs while executing the update database fields operation, return a JSON response with a 500 (bad request) HTTP status code and an error message indicating that the update failed due to a database error.

If the update operation is successful, return a JSON response with a 200 (OK) HTTP response, a success message and the number of modified documents(in this case 1) to indicate the TODO item has updated successfully.

#### Delete Todo

This handler function handles all DELETE HTTP requests for  `"localhost:9000/todo/:id"`. It deletes a TODO item from the database.

```go
func deleteTodo(rw http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	res, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Printf("invalid id: %v\n", err.Error())
		rnd.JSON(rw, http.StatusBadRequest, err.Error())
		return
	}

	filter := bson.M{"id": res}
	if data, err := db.Collection(collectionName).DeleteOne(r.Context(), filter); err != nil {
		log.Printf("could not delete item from database: %v\n", err.Error())
		rnd.JSON(rw, http.StatusInternalServerError, renderer.M{
			"message": "an error occurred while deleting todo item",
			"error":   err.Error(),
		})
	} else {
		rnd.JSON(rw, http.StatusOK, renderer.M{
			"message": "item deleted successfully",
			"data":    data,
		})
	}
}
```

In the code above, We extract the ID from the URL path using `chi.URLParam(r, "id")`. 

we check if the **ID** is a valid hex value and convert the **ID** from `hex` to `primitive.ObjectID` using `primitive.ObjectIDFromHex(id)`.  `primitive.ObjectIDFromHex(id)` returns two values `res` and `err`. 

 if `err` is not empty, the ID is invalid, we return a JSON response with a 400(Bad Request)HTTP status code and an error message indicating it’s an invalid ID. 

If `res` is not empty, create a filter variable `bson.M` object to store the  ID saved in the `res` . `db.Collection(collectionName).DeleteOne(r.Context(), filter)` will find the TODO entry with that ID and delete it from the database. 

If deleting the TODO item from the database encounters an error, we return a JSON response with a 500(Internal Server Error) and the error message indicating an error occurred while deleting the TODO item.

If the database successfully deleted the item, return a JSON response with an HTTP status code 200(OK), the success message and the number of deleted entries in the database.

With this we are done building the REST APIs we need to perform CRUD operations.

Now you can test all the API endpoints created in this tutorial with Postman.

For the complete code, view it on [GitHub](https://github.com/Kellswork/golang-todo-app).

### **Next Steps**

In the upcoming sections, we'll cover:

- Connecting a Todo Frontend to the Todo Backend: [Learn how to set up HTML Templates and Static Assets in Golang](https://www.agirlcodes.dev/golang-setup-html-templates-and-static-assets)
- Building the Todo Frontend with Fetch API and Vanilla JavaScript(TypeScript version too )
- Writing Go tests for the Todo backend.
- Testing API endpoints using Postman.

### Conclusion

In this tutorial, you've learned to set up a Go application, connect to a server, gracefully shut down the server, and create a Home API endpoint along with CRUD Todo API endpoints. With a functional backend, you can test all API endpoints using Postman. If you need to familiarize yourself with this process, watch for my upcoming article on testing API endpoints with Postman.

As for the front end, I have published a guide on [how to build a CRUD Todo App with Fetch API and Vanilla JavaScript](https://www.agirlcodes.dev/todo-app-frontend-crud-vanilla-js-fetch-api). The TypeScript version will be availabl next week. Before starting that, check out my recent article on [connecting the frontend with the backend using HTML templates and static files ( CSS and JavaScript or TypeScript)](https://www.agirlcodes.dev/golang-setup-html-templates-and-static-assets). It covers how to add and host static files on your Golang server. However, if you're not interested, I can provide you with a link to download the HTML, CSS, and JavaScript code so you can test the Todo backend API endpoints with the frontend UI instead of Postman.

I also plan on publishing an article detailing how to write Golang tests for the backend APIs. If you want these tutorials sent to you, subscribe to my newsletter, and you will get them once they are published.

I hope you found this helpful ❤️.

*Recommended Reads*

- [Setup HTML Templates and Static Assets in Golang](https://www.agirlcodes.dev/golang-setup-html-templates-and-static-assets).
- [Build a CRUD Todo App with Vanilla JavaScript and Fetch API](https://www.agirlcodes.dev/todo-app-frontend-crud-vanilla-js-fetch-api).
