import React from "react";
import BaseLayout from "./baseLayout";
import { GitHub, Globe, Gmail, LinkedIn, Mail } from "./molecules/svg";

import Divider from "./molecules/divider";
import { TextAndSvg, TitleAndSvg } from "./molecules/helpers";
import Newsletter from "./molecules/Newsletter";
// TODO: Remove the `hidden` class from newslwtter when you are ready to // implement it. take the chance to update the article too.

const Footer = () => (
  <div className="bg-neutral-100">
    <BaseLayout>
      <div className="flex ft:flex-col py-8 justify-between ">
        <Newsletter />

        <div className="get-in-touch ft:mt-6">
          <TitleAndSvg
            padding="pb-3"
            title="Get In Touch"
            svg={<Globe />}
            justifyContent="justify-center"
          />
          <div className="ft:flex ft:justify-evenly">
            <TextAndSvg
              text="LinkedIn"
              url="https://www.linkedin.com/in/kelechi-ogbonna/"
              svg={<LinkedIn />}
            />

            <TextAndSvg text="Gmail" url="mailto: kells@agirlcodes.dev" svg={<Gmail />} />
          
            <TextAndSvg
              text="GitHub"
              url="https://github.com/Kellswork"
              svg={<GitHub />}
            />
          </div>
        </div>
      </div>
    </BaseLayout>
    <Divider />
    <BaseLayout spacing="py-10 text-center">
      <p className="pb-4">
        Articles written by Kelechi Ogbonna. All rights reserved
      </p>
      <p>Built with NextJs Typescript and TailwindCSS</p>
    </BaseLayout>
  </div>
);
export default Footer;
