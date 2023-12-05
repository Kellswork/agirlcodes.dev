import React from "react";
import BaseLayout from "./baseLayout";
import Divider from "./molecules/divider";
import { BlogPostlistCard, ProfileCard } from "./molecules/cards";
import { FilterChipUnselected } from "./molecules/button";

const MainContent = () => {
  return (
    <BaseLayout>
      <div className="flex mt-24 mb-8 justify-between">
        <div>
          <Divider />
          <div className="codelang-filter-chip flex justify-between w-9/10 mt-3">
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
      </div>
    </BaseLayout>
  );
};

export default MainContent;
