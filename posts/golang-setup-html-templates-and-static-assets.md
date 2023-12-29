---
title: 'Setup HTML Templates and Static Assets in Golang'
date: 29-12-2023
fullDate: Friday, 29 December 2023
tags: Go
image: /posts-images/html-templates-static-assets/golang-setup-html-templates-and-static-assets.jpg
description: "This guide will focus on generating HTML templates, serving static CSS and Javascript files using Golang, setting up the Fronted app and connecting it to the backend. We are using Go to create a simple web server service that will serve HTML, CSS and JavaScript files when you navigate to a localhost http address."
url: '/golang-setup-html-templates-and-static-assets'
---

This article is a continuation of the previous one, where we built a simple Todo App backend with Golang.

If you are new to Go and would like an easy way to get your feet wet, check out my article on building a Simple Todo CRUD REST API with Go and MongoDB.

This guide will focus on generating HTML templates, serving static CSS and Javascript files using Golang, setting up the Fronted app and connecting it to the backend.

As we've finished building the backend application, it's time to set up the front end, connect it to the backend, and create a full-stack web application.

This article lays the foundation for the upcoming one, where we will build a Todo Frontend App with the Fetch API and Vanilla JavaScript (with a TypeScript version available)(add links)January 8, 2024 .

Update this article with the link for the fronted after you’ve published

This Todo App has monolith architecture, indicating the Frontend and Backend share the same codebase.

We are using Go to create a simple web server service that will serve HTML, CSS and JavaScript files when you navigate to a localhost address.

## Render HTML template in Go.

To render HTML templates in a Go application, we first need to parse them. Parsing means that Go can read the HTML template file we create, identify syntax and placeholder tokens, and then render the file as an HTML file. 

The [renderer](https://github.com/thedevsaddam/renderer) package , which we use for handling API responses in the Golang backend todo app, provides a straightforward way to parse HTML templates. Under the hood, it uses the [Go html/template package](https://pkg.go.dev/html/template). However, you can use the default Go html/template package, depending on your preference.

#### ADD HTML Template

The HTML template contains code for a task input box and a submit button. The div with id "todos" is used to add todos retrieved from the backend API and display them dynamically in the todos div on the Frontend.

![input-box.png](/posts-images/html-templates-static-assets/html-template-go-input.jpg)


To add the HTML template,

1. Create an “html” folder in your project’s root directory.
2. Inside the folder, create an “index.html” file.
3. Copy and paste the following code into the "index.html" file, or you can download the file from [GitHub](https://github.com/Kellswork/golang-todo-app/blob/feat/setup-html-template-and-asset-files/html/index.html). 

```html
{{define "indexPage"}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>To Do App - with html, css and Javascript</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
    />

    <link rel="stylesheet" type="text/css" href="/static/style.css" />
  </head>

  <body>
    <div class="container">
      <div id="new-todo">
        <input type="text" placeholder="Tasks to be done" />
        <button type="button" id="submit">Add</button>
      </div>
      <div id="todos"></div>
    </div>
  </body>
</html>
{{end}}
```

In the code above,

We define an HTML template named” **indexPage”**, which we will serve as the Response when a user navigates to our homepage.

We linked the CSS file to the index page, ensuring the HTML templates applied the styles correctly.

#### Add CSS File

To add the CSS file;

1. Create a Static folder in the root directory. You can name this folder “public” or “assets” if you want.
2. Inside the folder, create “**style.css**” file.
3. Copy and paste the following code into the "style.css" file or you can download the file from [GitHub](https://github.com/Kellswork/golang-todo-app/tree/feat/setup-html-template-and-asset-files/static). (link to file on GitHub).
4. Link the css file to “index.html” file. make sure you have added the css link to the `<head>` tag in the index.html file

```html
<head>
  ...
  <link rel="stylesheet" type="text/css" href="/static/style.css" />
</head>
```

**Note:** Do not copy the JS file. We will build the Frontend app in another article. ( could remove in the future)

this is a basic styling i crated for the Todo app frontend layout. feel free to use this or the stylesd of your choice.

`static/style.css`

```css
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  background: linear-gradient(135deg, #8052ec, #d161ff);
}

.container{
 border: 2px solid white;
 width: 40%;
 min-width: 450px;
 position: absolute;
 transform: translate(-50%, -50%);
 top: 50%;
 left: 50%;
 padding: 30px 40px;
}

#new-todo{
background-color: #fff;
padding: 30px 20px;
border-radius: 5px;
box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

#new-todo input{
 width: 70%;
 height: 45px;
 font-family: 'Poppins', Verdana, Geneva, Tahoma, sans-serif;
 font-size: 15px;
 border: 2px solid #d1d3d4;
 padding: 12px;
 color: #100f0f;
 position: relative;
 font-weight: 500;
 border-radius: 5px;
}

#new-todo input:focus {
 outline: none;
 border-color: #8052ec;
}

#new-todo button {
 position: relative;
 float: right;
 width: 20%;
 height: 45px;
 border-radius: 5px;
 font-family: 'Poppins', Verdana, Geneva, Tahoma, sans-serif;
 font-weight: 500;
 font-size: 16px;
 border: none;
 background-color: #8052ec;
 color: #fff;
 cursor: pointer;
}

#todos {
 background-color: #fff;
 padding: 30px 20px;
 margin-top: 10px;
 border-radius: 10px;
 width: 100%;
 box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
 position: relative;
}

.todo {
 background-color: #fff;
 height: 50px;
 padding: 5px 10px;
 margin-top: 10px;
 display: flex;
 align-items: center;
 justify-content: space-between;
 border-bottom: 2px solid #d1d3d4;
 cursor: pointer;
}

.todo span{
 font-family: 'Poppins', Verdana, Geneva, Tahoma, sans-serif;
 font-size: 15px;
 font-weight: 400;
}
.todo .actions {
  height: 100%;
}
.todo button {
 background-color: #8052ec;
 color: #fff;
 height: 100%;
 width: 40px;
 border-radius: 5px;
 border: none;
 cursor: pointer;
 outline: none;
}

.completed{
 text-decoration: line-through;
}
```

Your folder structure should look like this;

![go-assets-folder-struct.jpg](/posts-images/html-templates-static-assets/go-assets-folder-struct.jpg)

You can check the code on GitHub for reference

#### Parse HTML template

Now we have the HJTML and CSS files setup, let’s get Go to display them. In your `main.go` file, update the `renderer` method in `func init`   by adding the HTML parsing option to  `rnd = renderer.New()` .

```go
func init() {

	rnd = renderer.New(
		renderer.Options{
			ParseGlobPattern: "html/*.html",
		},
	)
...
}
```

Here, we create a new renderer instance and set the **`ParseGlobPattern`** option. This option allows us to look for files inside the **HTML folder** with the “.html” extension and render them as templates.

Now, update the **homeHandler** in `main.go` file to return the content from the indexPage in the HTML template so that when a user makes a browser HTTP request to “localhost:9000/”, it returns the indexPage in the HTML template.

```go
func homeHandler(rw http.ResponseWriter, r *http.Request) {
	// filePath := "./README.md"
	// err := rnd.FileView(rw, http.StatusOK, filePath, "readme.md")

	err := rnd.HTML(rw, http.StatusOK, "indexPage", nil)
}
```

Here, I commented out the `README.md` file that was being returned and replaced it with the "HTML" template renderer, as mentioned above.

Run `go run main.go` to view the result.

**Note**: If you used my Go Todo Backend API tutorial, make sure to have your database up and running, otherwise the app will crash.

## Serve Static CSS and JavaScript Files in Go.

After running `main.go` and navigating to `localhost:9000`. You notice that the HTML lacks CSS, and the URL returns a 404 error for the static files.

![html-templates-static-assets/static-asseets-404.jpg](posts-images/html-templates-static-assets/static-asseets-404.jpg)

To fix this error, we must serve the static files to `Go` by publishing the `CSS`  files. 

To publish the static files, update `func main` in `main.go` and add the following code after where you defined `middleware.Logger` and before where you specified the `homehandler` to ensure that the **static** files are available when a user sends a request to `localhost:9000`.

`/main.go`

```go
// Serve static files
fs := http.FileServer(http.Dir("./static"))
router.Handle("/static/*", http.StripPrefix("/static/", fs))
```

In the code above, we use the file server handler `http.fileServer` to serve static files from the ‘**static**’ directory on the server.

The `router.Handle` method handles the route for serving static files. In this example, we use `chi.Router`,so update accordingly to whatever router you are using. This setup specifies that any URL path request starting with `“/static/”` should be handled by the ‘**fs’** (file server )**.**

The `http.StripPrefix` removes the `‘static’` prefix from the request URL, so instead of the request URL to be `domain-name/static/static/style.css`, it will be `domain-name/static/styles.css`.

Once you complete the setup,  run `go run main.go` and navigate to `localhost:9000` in your web browser. You will see that the page has applied the styles, and the URL will return a `200 status ok` for the CSS and script file( if you added one ), indicating that the server has successfully served the static files.

![html-templates-static-assets/static-asseets-200.jpg](posts-images/html-templates-static-assets/static-asseets-200.jpg)


 **JavaScript File**

Adding a JavaScript file is no different from adding a CSS file. The process is exactly the same. Simply create a `script.js` file inside the `static` folder (or whichever folder name you used). After restarting the server, the JavaScript file will be picked up and served, just like the CSS file.css file.

**Final Result**

This is what the UI looks like with the styles applied;

![html-template-css-asset-result.jpg](/posts-images/html-templates-static-assets/html-template-css-asset-result.jpg)

### TypeScript Configuration and Setup

If you're using vanilla JS, you can write the JavaScript code directly in the `script` tag or a separate file. 

But for TypeScript, It’s best to create a separate `script.ts` file, compile it to JavaScript using the TypeScript compiler, and then import the resulting `script.js` file into your HTML template. 

Why? Because it was difficult to find compilers that could compile the Typescript in the `<script>` tag in the HTML file, and I couldn't find one that worked well enough.

To add a TypeScript file, run this npm command to install Typescript globally.

```bash
npm install -g typescript
```

Then, check the installed version by running `tsc --version`.

Create a **`tsconfig.json`** file at your project's root and paste the configuration code into it. Adding the **`tsconfig.json`** file is recommended for more precise code management and better code quality.

`/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es2017",
    "module": "ESNext",
    "sourceMap": true,
    "strict": true,
    "alwaysStrict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "allowUnreachableCode": false,
    "strictFunctionTypes": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

Next, add a `script.ts` file to the `static` folder. 

To compile the `script.ts` file,

```bash
tsc static/script.ts
```

By default, TypeScript will output the compiled JavaScript file `script.js` in the same folder as the TypeScript file. If you want to change this behaviour, you can add the `"outDir"` option to the configuration. For example, setting `"outDir": "dist"` will output the compiled file to the **dist** folder.

Don't forget to include `script.js` as the script tag above `</body>` tag source in your HTML code. 

```html
<script  src="/static/script.js"></script>
```

Your folder structure should look like this;

![asset-file-tsconfig.jpg](/posts-images/html-templates-static-assets/asset-file-tsconfig.jpg)

To test, add a simple code to the `script.ts` file (e.g. `console.log(’hello’)` )and compile the **ts** file to test. If using a middleware logger, you should see the `GET request` result on the terminal.

![asset-ts-file-200.jpg](/posts-images/html-templates-static-assets/asset-ts-file-200.jpg)

Now, you're all set to write and compile TypeScript code. 

Get the complete code for HTML template setup and asset files on [GitHub](https://github.com/Kellswork/golang-todo-app/tree/feat/setup-html-template-and-asset-files). 

For TypeScript configuration, check out the file on [GitHub](https://github.com/Kellswork/golang-todo-app/tree/feat/add-typescript-configuration). 

Note the codes are on different branches, and I have provided the links to the branches on GitHub.

### Conclusion

In this continuation article, we learned how to generate HTML templates and serve static CSS and JavaScript files using Golang; we set up a Typescript configuration for people who would prefer to use it. Following the steps outlined in this guide, we can now render HTML templates, parse them, and serve static files.

With this basic setup, we are ready to build the Todo App Frontend with HTML, CSS, and Vanilla JavaScript or TypeScript, using the JavaScript Fetch API to consume the Todo backend API endpoints.