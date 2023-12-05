import React from "react";
import BaseLayout from "../baseLayout";
import { Button, FilterChipFilled } from "./button";
import Link from "next/link";
import Image from "next/image";
import profilepic from "../../public/images/profile.jpg";

interface CardProps {
  title?: string;
  tag?: string;
  date?: string;
  description?: string;
  buttonText?: string;
}

export const BlogPostlistCard = (props: CardProps) => (
  <div className="font-roboto max-w-[632px] py-5">
    <h2 className="text-titleLarge font-medium pb-4">
      Lorem Ipsum is simply dummy text of the printing
    </h2>
    <div className="pb-4">
      <FilterChipFilled />
      <span className="px-2 text-sm font-medium">7 November, 2023 </span>
    </div>
    <div className="text-sm max-w-[600px] pb-4">
      Lorem Ipsum has been the industry&apos;s standard dummy text ever since
      the 1500s, when an unknown printer took a galley of type and scrambled it
      to make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting.{" "}
    </div>

    <Link className="text-sm font-medium text-purple-4" href="/">
      Learn more
    </Link>
  </div>
);

export const ProfileCard = () => (
  <div className="w-80 border border-[#CAC4D0] rounded-xl bg-white max-h-[680px] md:hidden">
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
        Hello! I&apos;m a full-stack engineer with extensive experience in
        modern web user interface development. I specialise in React JS and
        Typescript for front-end work, and Express/Node JS, Golang and
        PostgreSQL for back-end development.
      </p>
      <p className="text-left text-sm pb-4">
        I share insights on these technologies. Check out my profile to learn
        more about my work and feel free to contact me if you&apos;re interested
        in working together.
      </p>

      <Button
        text="VIEW PROFILE"
        borderRadius="rounded-[20px]"
        width="w-full"
        bgColor="bg-purple-1"
        textColor="text-text-color"
      />
    </div>
  </div>
);

export const ProfileCardMobile = () => (
  <div className="profile-card-mobile lg:hidden">
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

    <div className="profile-details mt-4 mb-8 max-w-[90%]">
      <p className="text-left pb-3">
        Hello! I&apos;m a full-stack engineer with extensive experience in
        modern web user interface development. I specialise in React JS and
        Typescript for front-end work, and Express/Node JS, Golang and
        PostgreSQL for back-end development.
      </p>
      <p className="text-left pb-4">
        I share insights on these technologies. Check out my profile to learn
        more about my work and feel free to contact me if you&apos;re interested
        in working together.
      </p>

      <Button
        text="VIEW PROFILE"
        borderRadius="rounded-[20px]"
        bgColor="bg-purple-1"
        textColor="text-text-color"
      />
    </div>
  </div>
);

/*
TODO
- update the profile cards, see how you can reduce the repition
*/