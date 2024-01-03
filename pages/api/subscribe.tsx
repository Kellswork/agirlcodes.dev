import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const EmailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" });

type Data = {
  message?: string;
  error?: string;
};

const subscribeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const emailValidation = EmailSchema.safeParse(req.body.email);

  if (!emailValidation.success) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address" });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const API_SERVER = process.env.MAILCHIMP_API_SERVER;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const data = {
    email_address: emailValidation.data,
    status: "subscribed",
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `api_key ${API_KEY}`,
    },
  };

  try {
    const response = await axios.post(url, data, options);
    if (response.status == 200)
      return res
        .status(201)
        .json({ message: "Awesome! You have successfully subscribed!" });
  } catch (error) {
    console.error(
      `${error.response.status}`,
      `${error.response.data.title}`,
      `${error.response.data.detail}`
    );
    return res.status(500).json({
      message:
        "Oops! There was an error subscribing you to the newsletter. Please email me at ogbonnakell@gmail.com and I'll add you to the list.",
    });
  }
};

export default subscribeHandler;

// mailchimp add member to list api: https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/

/*
steps:
 1. get mailchimp api key, audience id,
 2. install axios and setup  post request using async
 3. pass the data need ( data, options and url), make sure not to make any mistakes in the url and data, infact with any parameter being passed cause it could lead to an error message
 4. move to components/subscribe
*/
