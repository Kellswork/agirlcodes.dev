import React from "react";
import { FilterChipSelected, FilterChipUnselected } from "./molecules/button";
import { PostDataProps, getSortedPostsData } from "../utils/util";
import { BlogPostlistCard } from "./molecules/cards";
import { DateTime } from 'luxon'





const BlogPostList = ({posts}:{posts: PostDataProps[]}) => {

  const sortBlogPosts = posts.sort((a, b) => {
    const beforeDate: any = DateTime.fromFormat(a.frontMatter.date, 'm-d-yyyy')
    const afterDate: any = DateTime.fromFormat(b.frontMatter.date, 'm-d-yyyy')
    return afterDate - beforeDate
  });

  const formatDate = (date) => DateTime.fromFormat(date, 'd-m-yyyy').setLocale('en-GB').toLocaleString(DateTime.DATE_FULL);;

  return (
    <>
      {/* <div className="codelang-filter-chip flex justify-between w-9/10 my-5 md:w-[90%] sm:flex-wrap">
        <FilterChipSelected />
        <FilterChipUnselected />
        <FilterChipUnselected />
        <FilterChipUnselected />
        <FilterChipUnselected />
      </div> */}

      <div className="post-list mt-4">
        {sortBlogPosts.map((post) => <BlogPostlistCard key={post.id} title={post.frontMatter.title} description={post.frontMatter.description} date={post.frontMatter.date} url={post.id} tags={post.frontMatter.tags}/>)}
      </div>
    </>
  );
};

export default BlogPostList;

/* TODO: 
Take out the margin-top from post list when you add the filter functionality back
https://amirardalan.com/blog/syntax-highlight-code-in-markdown
just adding the blog link here for refernce.
*/