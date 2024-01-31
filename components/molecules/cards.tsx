import React from "react";
import BaseLayout from "../baseLayout";
import { Button, FilterChipFilled } from "./button";
import Link from "next/link";
import Image from "next/image";
import profilepic from "../../public/agirlcodes.jpg";

interface CardProps {
  title?: string;
  tags: string | string[];
  date?: string;
  fullDate?: string;
  description?: string;
  url?: string;
}

export const BlogPostlistCard = ({
  title,
  url,
  description,
  date,
  tags,
}: CardProps) => (
  <div className="box-border font-roboto max-w-[632px] rounded  py-4 md:max-w-full">
    <h2 className="text-titleLarge font-medium pb-4 md:text-[20px] sm:text-[20px] hover:opacity-80">
      <Link href={`/${url}`}> {title}</Link>
    </h2>
    <div className="pb-4">
      <FilterChipFilled tags={tags} />
      <span className="px-2 text-sm font-medium text-slate-600">{date}</span>
    </div>
    <div className="max-w-[600px] pb-4 md:max-w-full">{description}</div>
    <Link
      className="inline-block relative after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bg-purple-5 after:bottom-0 after:left-0 after:origin-bottom-left after:transition-transform after:ease-out after:duration-200 hover:after:scale-x-100 :hover:after:origin-bottom-right hover:opacity-80 text-sm font-medium text-purple-4"
      href={`/${url}`}
    >
      Read More
    </Link>
  </div>
);

export const ProfileCard = () => (
  <div className="w-80 border border-[#CAC4D0] rounded-xl bg-white max-h-[625px] md:hidden sm:hidden">
    <div className="relative">
      <div className="h-48 rounded-t-xl bg-purple-1 opacity-50"></div>
      <div className="absolute top-28 left-1/4 ">
        <Image
          className=" inline-block rounded-full ring-8 ring-white"
          width={150}
          height={150}
          src={profilepic}
          alt="my profile photo"
          loading="lazy"
        />
      </div>
    </div>

    <div className="mt-24 mb-7 font-roboto px-6">
      <h3 className="font-bold text-headlineMedium text-center pb-3">
        Kelechi Ogbonna
      </h3>
      <p className="font-medium text-headlineSmall text-center pb-3">
        Software Engineer
      </p>

      <p className="text-left text-sm pb-3">
        Hey there! I&apos;m Kelechi Ogbonna, a full-stack engineer with
        extensive experience in React JS, Typescript, Express/Node JS, Golang,
        and PostgreSQL.
      </p>
      <p className="text-left text-sm pb-3">
        I am passionate about sharing my knowledge through my writing. Please
        feel free to contact me if you&apos;re interested in collaborating
        together.
      </p>

      <Button
        text="VIEW PROFILE"
        borderRadius="rounded-[20px]"
        width="w-full"
        bgColor="bg-purple-1"
        textColor="text-text-color"
        activeColor="bg-purple-2"
        url="https://www.linkedin.com/in/kelechi-ogbonna/"
      />
    </div>
  </div>
);

export const ProfileCardMobile = () => (
  <div className="profile-card-mobile xl:hidden">
    <div className="flex items-center">
      <div>
        <Image
          className=" inline-block rounded-full ring-8 ring-purple-1"
          width={80}
          height={80}
          src={profilepic}
          alt="my profile photo"
          loading="lazy"
        />
      </div>

      <div className="font-roboto ml-6">
        <h3 className="font-bold text-titleLarge pb-1">Kelechi Ogbonna</h3>
        <p className="font-medium text-[18px]">Software Engineer</p>
      </div>
    </div>

    <div className="profile-details mt-4 mb-8 max-w-[90%] sm:max-w-full">
      <p className="text-left pb-3">
        Hey there! I&apos;m Kelechi Ogbonna, a full-stack engineer with
        extensive experience in React JS, Typescript, Express/Node JS, Golang,
        and PostgreSQL.
      </p>
      <p className="text-left pb-4">
        I am passionate about sharing my knowledge through my writing. Please
        feel free to contact me if you&apos;re interested in collaborating
        together.
      </p>

      <Button
        text="VIEW PROFILE"
        borderRadius="rounded-[20px]"
        bgColor="bg-purple-1"
        textColor="text-text-color"
        activeColor="bg-purple-2"
      />
    </div>
  </div>
);

/*
TODO
- update the profile cards, see how you can reduce the repition
*/
