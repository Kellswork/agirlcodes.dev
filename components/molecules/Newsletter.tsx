import { FormEvent, useState } from "react";
import { TitleAndSvg } from "./helpers";
import { Mail } from "./svg";
import { Button } from "./button";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<
    "success" | "error" | "loading" | "idle"
  >("idle");
  const [responseMsg, setResponseMsg] = useState<string>(null);
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
    } catch (e) {
      setStatus("error");
      setStatusCode(e.response.status);
      setResponseMsg(e.response.data.error);
    }

    setTimeout(() => {
      setEmail("");
      setStatus("idle");
      setStatusCode(null);
    }, 3000);
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
        className={`flex transition ease-out delay-75 focus-within:border-2 focus-within:border-purple-7 items-center h-14 pr-0.5 border rounded ${
          statusCode == 400 ? "border-orange-500" : ""
        }`}
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
          <p className="text-green-600">{responseMsg}</p>
        )}
        {status === "error" ? (
          <p className="text-orange-600">{responseMsg}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Newsletter;
