import React from "react";
import BaseLayout from "./baseLayout";
import { GitHub, Globe, Gmail, LinkedIn, Mail } from "./molecules/svg";
import { Button } from "./molecules/button";
import Divider from "./molecules/divider";

interface TitleAndSvgProps {
  title: string;
  svg: JSX.Element;
  padding?: string;
  justifyContent?: string;
}
const TitleAndSvg = ({ title, svg, padding, justifyContent }: TitleAndSvgProps) => (
  <div className={`flex items-center ${padding} ${justifyContent || ''}`}>
    <h2 className="text-titleLarge font-bold pr-2 text-purple-7">{title}</h2>
    <span>{svg}</span>
  </div>
);

const TextAndSvg = ({ text, svg,url }: {text: string; svg: JSX.Element; url: string}) => (
  <div className='flex items-start pb-3  '>
    <span>{svg}</span>
    <p className="text font-bold pl-0.5 text-purple-7 underline decoration-blue-400 hover:decoration-2 cursor-pointer"><a href={url}>{text}</a></p>
  </div>
);

const Footer = () => (
  <div className="bg-neutral-100">
    <BaseLayout>
      <div className="flex ft:flex-col py-8 justify-between ">
        <div className="newsletter-card max-w-lg ft:max-w-full px-8 py-4 rounded bg-white">
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
                activeColor="bg-purple-7"
              />
            </div>
          </form>
        </div>

        <div className="get-in-touch ft:mt-6">
          <TitleAndSvg padding="pb-3" title="Get In Touch" svg={<Globe />} justifyContent="justify-center"/>
          <div className="ft:flex ft:justify-evenly">
    
              <TextAndSvg text="LinkedIn" url="https://www.linkedin.com/in/kelechi-ogbonna/" svg={<LinkedIn />} />
 

              <TextAndSvg text="Gmail" url="" svg={<Gmail />} />
      
         
              <TextAndSvg text="GitHub" url="https://github.com/Kellswork" svg={<GitHub />} />
    
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
