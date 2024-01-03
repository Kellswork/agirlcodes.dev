import { FormEvent, useState } from "react";
import { TitleAndSvg } from "./helpers";
import { Mail } from "./svg";
import { Button } from "./button";
import axios from "axios";


// https://medium.com/@dilarauluturhan/form-validation-for-frontend-developer-6320b0a05792


const Newsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<
    "success" | "error" | "loading" | "idle"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>(null);
  const [statusCode, setStatusCode] = useState<number>();
  // const [responseStatus, setResponseStatus] = useState<number>(null);

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");


    try {
      
      const response = await axios.post("/api/subscribe", { email });
      console.log(response);

      setStatus("success");
      // setResponseStatus(e.response.status);
      setEmail("");
    } catch (e) {
      console.log(e.response.data.error);
      // setResponseStatus(e.response.status);
      setStatus("error");
    }
  }

 

  return (
    <div className="newsletter-card max-w-lg ft:max-w-full px-8 py-4 rounded bg-white">
      <TitleAndSvg
        padding="pb-4"
        title="Subscribe to my Newsletter"
        svg={<Mail />}
      />
      <p className="pb-6">
        Get notified on quality articles about full-stack development and more
        sent to your inbox. I&apos;ll send you an email once a month, no spam.
      </p>
      <form
        onSubmit={handleSubscribe}
        className={`flex transition ease-out delay-75 focus-within:border-2 focus-within:border-purple-7 items-center h-14 pr-0.5 border rounded`}
      >
        <input
          type="text"
          placeholder="What is your email address?"
          className="grow mx-4 focus:outline-none disabled:bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status == "loading"}
        />
        <div>
          <Button
            bgColor="bg-purple-5"
            text="Subscribe"
            borderRadius="rounded"
            height="h-[50px]"
            textColor="text-white"
            activeColor="bg-purple-7"
            disabled={status == "loading"}
            type="submit"
          />
        </div>
      </form>
      <div className="server-message pt-4 text-green-600">
        {status === "success" && (
          <p className="text-green-600">
            Awesome! You have successfully subscribed!
          </p>
        )}
        {status === "error" ? (
          <p className="text-orange-600">{errorMsg}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Newsletter;

