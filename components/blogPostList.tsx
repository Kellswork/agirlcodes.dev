import React from "react";
import { FilterChipSelected, FilterChipUnselected } from "./molecules/button";
import { PostDataProps, getSortedPostsData } from "../utils/util";
import { BlogPostlistCard } from "./molecules/cards";


const BlogPostList = ({posts}:{posts: PostDataProps[]}) => {

  return (
    <>
      <div className="codelang-filter-chip flex justify-between w-9/10 my-5 md:w-[90%] sm:flex-wrap">
        <FilterChipSelected />
        <FilterChipUnselected />
        <FilterChipUnselected />
        <FilterChipUnselected />
        <FilterChipUnselected />
      </div>

      <div className="post-list">
        {posts.map((post) => <BlogPostlistCard key={post.id} title={post.frontMatter.title} description={post.frontMatter.description} fullDate={post.frontMatter.fullDate} url={post.id}/>)}
      </div>
    </>
  );
};

export default BlogPostList;
