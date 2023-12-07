import React from "react";
import BaseLayout from "./baseLayout";
import Divider from "./molecules/divider";
import { ProfileCard, ProfileCardMobile } from "./molecules/cards";
import { PostDataProps } from "../utils/util";
import BlogPostList from "./blogPostList";


const MainContent = ({allPostsData}: {allPostsData:PostDataProps[]}) => {
  return (
    <BaseLayout>
      <div className="main-content flex mt-14 mb-8 justify-between md:flex-col-reverse sm:flex-col-reverse">
        <div className="blog-post-list-section">
          <Divider />
          <BlogPostList posts={allPostsData} />
        </div>
        <ProfileCard />
        <ProfileCardMobile/>
      </div>
    </BaseLayout>
  );
};

export default MainContent;

