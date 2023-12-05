import React from "react";
import BaseLayout from "./baseLayout";
import Divider from "./molecules/divider";
import { BlogPostlistCard, ProfileCard, ProfileCardMobile } from "./molecules/cards";
import { FilterChipUnselected } from "./molecules/button";

const MainContent = () => {
  return (
    <BaseLayout>
      <div className="main-content flex mt-14 mb-8 justify-between md:flex-col-reverse">
        <div className="blog-post-list-section">
          <Divider />
          <div className="codelang-filter-chip flex justify-between w-9/10 mt-5">
            <FilterChipUnselected />
            <FilterChipUnselected />
            <FilterChipUnselected />
            <FilterChipUnselected />
            <FilterChipUnselected />
          </div>
          <div className="post-list">
            <BlogPostlistCard />
            <BlogPostlistCard />
            <BlogPostlistCard />
          </div>
        </div>
        <ProfileCard />
        <ProfileCardMobile/>
      </div>
    </BaseLayout>
  );
};

export default MainContent;
