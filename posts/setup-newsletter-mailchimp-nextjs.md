---
title: 'Setup a Newsletter with Next.js, TypeScript and Mailchimp'
date: 29-10-2021
fullDate: Friday, 29 October 2021
updatedAt: 12-02-2024
updatedAtFullDate: Monday, 12 February 2024
tags: NextJS
description: 'In this tutorial, you will learn how to set up a Newsletter on your Next Js, TypeScript blog with Mailchimp.'
image: '/posts-images/next-mailchimp.jpg'
url: '/setup-newsletter-mailchimp-nextjs'
---

I have updated this article to implement the newsletter subscription using TypeScript with Next.js.

Having a Newsletter subscription on your blog can be beneficial. It provides a way to build a closer connection with your readers, keep the blog fam up to date with your latest articles, and drive traffic to your blog.

In this tutorial, you will learn how to set up a Mailchimp Newsletter subscription on your Next.js TypeScript blog.

### Prerequisite

To follow along with this tutorial, a general knowledge of building APIs in Node.js and working with TypeScript and React will make it easier to understand the code, but in-depth knowledge of both is not required.

### Why Mailchimp?

MailChimp is a popular online marketing tool that you can use to manage your email list when you start getting subscribers. They have a free version for people with 2000 contacts or less. It's good enough for people beginning their newsletter journey.

### Setting Up Mailchimp

**Create an account with MailChimp**.

To get started, click [here to create a free MailChimp account](https://mailchimp.com/help/create-an-account/). When users subscribe to your newsletter, their email address is added to your `Audience` on your Mailchimp account. 

**Obtain API Keys and Audience ID**

Mailchimp provides API keys that allow other applications, i.e. your Next.js blog, to access your `Audience`. To connect your blog to Mailchimp API, we will need three environmental variables from Mailchimp;

- [**Generated API Key**](https://mailchimp.com/help/about-api-keys/#find+or+generate+your+api+key): grants access to your Mailchimp account. For documentation on how to get it, click [here](https://mailchimp.com/help/about-api-keys/#find+or+generate+your+api+key).
- [**API Server**](https://mailchimp.com/developer/marketing/guides/quick-start/#make-your-first-api-call) : This indicates the region where your Mailchimp data is stored ( e.g. `us2` )
- [**Audience ID**](https://mailchimp.com/help/find-audience-id/)

### Build **Next.Js API  and Newsletter Form**

We need a form and an API endpoint to collect the user's email and save it on Mailchimp. The good news is that Next.js allows us to do both without creating a separate backend application using Node.js.

To create a simple API, we only need to create a `pages/api` folder in our Next.js application. Next.js will automatically map any file inside this folder to the `/api/*` directory, turning it into an endpoint instead of a page. For more information on Next API routes [check here](https://nextjs.org/docs/api-routes/introduction).

When using the App Router version, your route file will be located in the `app/api/route.ts`. For more information on the App Route Handler, click [here](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).

To start, create a new Next.js application. Run the following command and follow the installation setup. Make sure to select TypeScript as part of your setup.

```typescript
npx create-next-app@latest
```

### Setup environment variables for development and production

It is considered best practice to store environment variables in `.env` files. Please avoid pushing your environment variables to your remote branch. Remember to add the `.env.local` file to your `.gitignore`.

**Local Setup**

Create a `.env.local` file in the root folder of your next js application. Place your environment variables in that file:

```typescript
MAILCHIMP_API_KEY="your-mailchimp-api-key"
MAILCHIMP_AUDIENCE_ID="your-mailchimp-audience-id"
MAILCHIMP_API_SERVER="your-api-server-region-prefix"
```

**Production Setup**

**NETLIFY**: [To add these variables to Netlify](https://docs.netlify.com/configure-builds/environment-variables), go to site settings > Build & deploy > Environment > Edit Variables.

**VERCEL**: To add environmental variables in Vercel, refer to their [documentation](https://vercel.com/docs/concepts/projects/environment-variables) for detailed instructions. For a simple walkthrough, go to the project settings > Environment Variables.

### Create Next.Js Server-side API Endpoint

[Axios](https://www.npmjs.com/package/axios) is a tool that provides an easy and clean way to make API requests.  Later on, we will use it to make a POST request to the [Mailchimp marketing API](https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/) to add a new email to our audience list. Make sure to install `Axios`  and `zod` by running the following command:

```typescript
npm install axios
npm install zod
```

Next, create a `subscribe.ts` file inside the `pages/api` folder. This file will contain the server-side API route for adding an email to the audience list.

Create `pages/api/subscribe.ts` and paste the following code inside it:

```typescript
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

// Define response data type
type Data = { message?: string; error?: string; };

// Email validation schema
const EmailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" });

// Subscription handler function
const subscribeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  // 1. Validate email address
  const emailValidation = EmailSchema.safeParse(req.body.email);
  if (!emailValidation.success) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }

  // 2. Retrieve Mailchimp credentials from environment variables
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const API_SERVER = process.env.MAILCHIMP_API_SERVER;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  // 3. Construct Mailchimp API request URL
  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  // 4. Prepare request data
  const data = {
    email_address: emailValidation.data,
    status: "subscribed",
  };

  // 5. Set request headers
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `api_key ${API_KEY}`,
    },
  };

  // 6. Send POST request to Mailchimp API
  try {
    const response = await axios.post(url, data, options);
    if (response.status == 200) {
      return res.status(201).json({ message: "Awesome! You have successfully subscribed!" });
    }
  } catch (error) {
    
    if (axios.isAxiosError(error)) {
      console.error(
        `${error.response?.status}`,
        `${error.response?.data.title}`,
        `${error.response?.data.detail}`
      );

      if (error.response?.data.title == "Member Exists") {
        return res.status(400).json({
          error: "Uh oh, it looks like this email's already subscribed🧐",
        });
      }
    }

    return res.status(500).json({
      error:
        "Oops! There was an error subscribing you to the newsletter. Please email me at ogbonnakell@gmail.com and I'll add you to the list.",
    });
  }
};

export default subscribeHandler;
```

In the code above, we created an asynchronous function called `subscribeHandler` that takes `request` and `response` as parameters. We imported the necessary modules.

```typescript
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod"; // Zod is used for data validation
```

`{ NextApiRequest, NextApiResponse }` is a built-in type support for API routes.

`zod` is a schema validation library for form fields. We use it to validate the email address obtained from the request body.

```typescript
type Data = { message?: string; error?: string; };

// Email validation schema
const EmailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" });
```

Next, we define a type called `Data` for the response data.

We defined a variable called `EmailSchema`, which is used to validate the email address in the request body.

```typescript
const subscribeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
```

We attach the built-in type for API Routes to the `request` and `response` parameters, as shown in the code snippet above.

We use the `EmailSchema.safeParse` function to validate if the email from the `req.body` is valid. The result of the validation is saved in the emailValidation `emailValidation` variable.

```typescript
) => {
  // Validate email address
  const emailValidation = EmailSchema.safeParse(req.body.email);
  if (!emailValidation.success) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }
```

The `zod` library then returns the `success` and `data` properties from the result.

We check the `emailValidation.success` property to determine whether the validation was successful. If it fails the validation, we send a response with a status code of **400 (Bad Request).**

```typescript
// Retrieve Mailchimp credentials from environment variables
const API_KEY = process.env.MAILCHIMP_API_KEY;
const API_SERVER = process.env.MAILCHIMP_API_SERVER;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

// Construct Mailchimp API request URL
const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
```

Next, we retrieve the Mailchimp environmental variables that we saved in the `env.local` file using `process.env`. We save the `Mailchimp URL` for adding a new email subscriber in a `url` constant variable, with the environmental variables present in the **url**. We will use this URL to make a POST request with Axios. To view the Mailchimp API documentation, click [here](https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/).

As mentioned earlier, the email validation process returns two properties: **success** and **data**. The `emailValidation.data` property contains the validated email string. We set this validated email string as the email address and assign the status property as `'subscribed'` as shown below.

```typescript
const data = {
  email_address: emailValidation.data,
  status: "subscribed",
};

// Set request headers
const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `api_key ${API_KEY}`,
  },
};
```

The term `'subscribed'` is part of the Mailchimp API and indicates that the user has been subscribed. I have provided a link to the Mailchimp marketing API, which you can use to update your data object properties with keys of your choice. Both `email_address` and `status` properties are required by the Mailchimp marketing API.

We also created an `options` object that specifies the content type and sets the authorization header to your `api_key`.

To add additional properties to the url,  [see the full list of options available](https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/). 

Finally, we make an asynchronous axios post request with the `url`, `data`, and `options` passed as parameters inside a `try-catch block`. The result is stored in the `response` variable. 

```typescript
try {
  const response = await axios.post(url, data, options);
  return res
    .status(201)
    .json({ message: "Awesome! You have successfully subscribed!" });
} catch (error) {
  // TODO: add this recent updated part to the article
  if (axios.isAxiosError(error)) {
    console.error(
      `${error.response?.status}`,
      `${error.response?.data.title}`,
      `${error.response?.data.detail}`
    );

    if (error.response?.data.title == "Member Exists") {
      return res.status(400).json({
        error: "Uh oh, it looks like this email's already subscribed🧐",
      });
    }
  }

  return res.status(500).json({
    error:
      "Oops! There was an error subscribing you to the newsletter. Please email me at ogbonnakell@gmail.com and I'll add you to the list.",
  });
}
```

If the post request is successful, we return a `201(created)` response along with a success message.

If the post request is unsuccessful, we catch the error and return a **500(server error )** status code with a generic error message. Additionally, I console.log the error message in case it is not a **500 error message**. 

The **`axios.isAxiosError(error)`** function is specific to TypeScript and is provided by Axios. It is used to check if an error is of the AxiosError type and converts the `error` object to the `AxiosError` type.

I also return **400 (bad requests )** if the email has been registered before.

Note: Ensuring the Mailchimp API takes the correct arguments is crucial. While working on this, I included a `first name` input field in the data object, but the API consistently returned a 500 server error. After studying what  Mailchimp API accepts as arguments for that API endpoint, I was able to solve the server response issue. 

This happened while trying to get a form field for both first name and email to work. The lesson learned here is to ensure the API's required data structure is understood before creating the front-end UI for it.

### Create a Newsletter Form Component.

Now that we have an API endpoint for making a POST request to newsletter MailChimp API, Let's create the client-side UI form where users can input and submit their email to subscribe to our newsletter. 

I already have an input form field created, so feel free to use my design or whatever form design of your choice. 

Create a `newsletter.tsx` file in the `components` folder. Add the code below

`/component/newsletter.tsx`

```typescript
import React from "react";

const Newsletter = () => {
  return (
    <form className="rounded px-8 pt-6 pb-8 mb-4 max-w-md">
      <div className="flex">
        <input
          className="grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-purple-600 items-center h-14 pr-0.5 border border-purple-600 rounded caret-purple-700 outline-none px-4 disabled:border-slate-400"
          type="email"
          placeholder="What is your email address?"
        />
        <button
          className="bg-violet-700 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-slate-400"
          type="submit"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default Newsletter;
```

The code above includes an email input field and a submit button styled with Tailwind CSS. Call `newsletter.tsx` inside your main component to render it on the DOM.

![newsletter-form.jpg](/posts-images/newsletter/newsletter-form.jpg)

Now that we have a simple email input form and a submit button, let’s add the subscription functionality and error handling.

### **Connecting** Newsletter Form **to Mailchimp**

**Create State Variables**

To implement this functionality, we need some state variables.

`/components/newsletter.tsx`

```typescript
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<
    "success" | "error" | "loading" | "idle"
  >("idle");
  const [responseMsg, setResponseMsg] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number>();

  return (
    <form className="rounded px-8 pt-6 pb-8 mb-4 max-w-md">
      <div className="flex">
        <input
          className="grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-purple-600 items-center h-14 pr-0.5 border border-purple-600 rounded text-purple-900 caret-purple-700 outline-none px-4 disabled:border-slate-400" 
type="email"
          placeholder="What is your email address?"
        />
        <button
          className="bg-violet-700 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-slate-400"
          type="submit"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default Newsletter;
```

In the code above, we use the `useState` hook to set and manage a few states that we need. Let's break it down.

1. **email**:  stores the user's input from the input box.
2. **status**: for tracking purposes.
3. **`responseMsg`**: stores the response message received from the server.
4. **statusCode**: We use this to determine which styles to apply based on the server's status code. You will see how I use this shortly.

### **Form Handling, State Management & Display Server Responses.**

Now that we have the state variables we need, let's add a `handleSubscribe` function that will be responsible for making the Axios POST request to the API endpoint we created in `subscribe.ts`.

`/components/newsletter.tsx`

```javascript
import { FormEvent, useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<
    "success" | "error" | "loading" | "idle"
  >("idle");
  const [responseMsg, setResponseMsg] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number>();

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await axios.post("/api/subscribe", { email });

      setStatus("success");
      setStatusCode(response.status);
      setEmail("");
      setResponseMsg(response.data.message);
    } catch (err) {
      
      if (axios.isAxiosError(err)) {
        setStatus("error");
        setStatusCode(err.response?.status);
        setResponseMsg(err.response?.data.error);
      }
    }
  }

  return (
    <>
      <form
        className="rounded px-8 pt-6 pb-8 mb-4 max-w-md"
        onSubmit={handleSubscribe}
      >
        <div className="flex">
          <input
            className={`grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-purple-600 items-center h-14 pr-0.5 rounded caret-purple-700 outline-none px-4 disabled:border-slate-400 border ${statusCode == 400 ? "border-orange-500" : "border-purple-600"} `}
            type="email"
            placeholder="What is your email address?"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status == "loading"}
          />
          <button
            className="bg-violet-700 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-slate-400"
            type="submit"
            disabled={status == "loading"}
          >
            Subscribe
          </button>
        </div>
        <div className="server-message pt-4 text-green-600">
          {status === "success" ? (
            <p className="text-green-600">{responseMsg}</p>
          ) : null}
          {status === "error" ? (
            <p className="text-orange-600">{responseMsg}</p>
          ) : null}
        </div>
      </form>
    </>
  );
};

export default Newsletter;

```

In the code above, we define an asynchronous function called `handleSubscribe`. This function is called when a user clicks the `subscribe` button, or presses `enter` to submit the form.

The `handleSubscribe` function takes an event (`e`) parameter of type `FormEvent<HTMLFormElement>`. 

 `e.preventDefault()` prevents the form from refreshing the page when a user submits the form.

Next, we create a `try-catch` block to handle the asynchronous API request. We use  `axios`  to make a POST request to `/api/subscribe` with the `email` data.

While the subscription request is being processed, we set the status to `loading`.

If the POST request is successful, we:

- Set the status to "**success"**.
- Set the `statusCode` to the HTTP status code returned by the server
- Clear the email input field
- Set the `responseMsg` based on the message returned from the server.

To use this function, we attach the `handleSubscribe` event handler function to the `onSubmit` event on the form element.

```typescript
<form className="rounded px-8 pt-6 pb-8 mb-4 max-w-md" onSubmit={handleSubscribe}>
```

Next, we add the value prop to the input field and set the value to the `email` state.

We use the `onChange` event to update the `email` state with the user's input in the box.

Finally, if the `status` is set to `"loading"`, we disable both the input field and the button element.

```typescript
<input
  ...
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  disabled={status === "loading"}
/>;

<button
  ...
  disabled={status === "loading"}
>

```

**Conditional Rendering for Success and Error Messages**

Lastly, we add a div section to display the server response messages stored in the `responseMsg` variable. We render them conditionally and style the input field border based on the value of the `status` variable.

```typescript
<div className="server-message pt-4">
  {status === "success" && (
    <p className="text-green-600">{responseMsg}</p>
  )}
  {status === "error" && (
    <p className="text-orange-600">{responseMsg}</p>
  )}
</div>;

```

If `status === 'success'`, we set the response message from the server and style the text with the colour green using Tailwind CSS.

If `status === 'error'`, we render the response message, style the text colour to orange, and style the input text field border to orange to indicate an error, as shown in the code below, but only if the `status code` is **400 (Bad request).**

```typescript
<input
  className={`grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-purple-600 items-center h-14 pr-0.5 rounded caret-purple-700 outline-none px-4 disabled:border-slate-400 border ${
    statusCode == 400 ? "border-orange-500" : "border-purple-600"
  } `}
  ...
/>;
```

### Final Result

<video class='video-container' src="/posts-images/newsletter/newsletter-mailchimp.mp4" width="640" height="auto" controls></video>


### Enhancing Subscription Form UX

**Managing Success and Error Messages**

Now that we have our subscription form in place, we can take a closer look at how we render success and error messages. Currently, we have two separate `<div>` elements handling these messages. 

It may be worthwhile to consider refactoring the code to use only one <div> to render both success and error messages. This can help improve the code's readability and maintainability. 

**Clear the response message.**

Additionally, to provide a smoother user experience, you can add a `setTimeout` function to `handleSubmit` function to automatically clear the response message after a brief period. This prevents the message from lingering on the screen, offering a more polished and user-friendly interaction. Check the code on GitHub to see how I implemented that.

You can explore this option later on if you'd like. Good luck! 🌷

> View the complete code on [GitHub](https://github.com/Kellswork/newsletter-mailchimp)

### Conclusion

To view the complete code, check it on [GitHub](https://github.com/Kellswork/agirl.codes/blob/main/pages/api/subscribe.js).

I hope this article was helpful. If you have any questions or comments, add it on Medium.

