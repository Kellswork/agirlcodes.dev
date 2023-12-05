import React from "react";
import BaseLayout from "./baseLayout";
import { GitHub, Globe, Gmail, LinkedIn, Mail } from "./molecules/svg";
import { Button } from "./molecules/button";
import Divider from "./molecules/divider";

interface TitleAndSvgProps {
  title: string;
  svg: JSX.Element;
  padding?: string;
}
const TitleAndSvg = ({ title, svg, padding }: TitleAndSvgProps) => (
  <div className={`flex items-center ${padding}`}>
    <h2 className="text-titleLarge font-bold pr-2 text-purple-7">{title}</h2>
    <span>{svg}</span>
  </div>
);

const TextAndSvg = ({ title, svg }: TitleAndSvgProps) => (
  <div className={`flex items-start pb-3`}>
    <span>{svg}</span>
    <p className="text font-bold pl-0.5 text-purple-7">{title}</p>
  </div>
);

const Footer = () => (
  <div className="bg-slate-100">
    <BaseLayout>
      <div className="flex py-12 justify-between">
        <div className="newsletter-card max-w-lg px-8 py-4 rounded bg-white">
          <TitleAndSvg
            padding="pb-4"
            title="Subscribe to my Newsletter"
            svg={<Mail />}
          />
          <p className="pb-6">
            Get to notified on quality articles about frontend development and
            more sent to your inbox. I&apos;ll send you an email once a month,
            no spam.
          </p>
          <form className="flex items-center h-14 pr-0.5 border border-[#79747E] rounded">
            <input
              type="text"
              placeholder="Your Email Address"
              className="grow mx-4 focus:outline-none"
            />
            <div>
              <Button
                bgColor="bg-purple-5"
                text="Subscribe"
                borderRadius="rounded"
                height="h-[50px]"
                textColor="text-white"
              />
            </div>
          </form>
        </div>

        <div className="get-in-touch">
          <TitleAndSvg padding="pb-3" title="Get In Touch" svg={<Globe />} />
          <div>
            <a href="">
              <TextAndSvg title="LinkedIn" svg={<LinkedIn />} />
            </a>
            <a href="">
              <TextAndSvg title="Gmail" svg={<Gmail />} />
            </a>
            <a href="">
              <TextAndSvg title="GitHub" svg={<GitHub />} />
            </a>
          </div>
        </div>
      </div>
    </BaseLayout>
    <Divider />
    <BaseLayout spacing="py-10">
      <p className="pb-4">
        Articles written by Kelechi Ogbonna. All rights reserved
      </p>
      <p>Built with NextJs Typescript and TailwindCSS</p>
    </BaseLayout>
  </div>
);
export default Footer;
