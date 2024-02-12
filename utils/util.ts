import fs from "fs";
import path from "path";
import matter from "gray-matter";


const postsDirectory = path.join(process.cwd(), "posts");

interface FrontMatter {
  title: string;
  date: string;
  description: string;
  fullDate: string;
  updatedAt: string;
  updatedAtFullDate: string;
  url: string;
  tags: string | string[];
  image: string;
}
export interface PostDataProps {
  id: string;
  contentHtml?: string;
  frontMatter: FrontMatter;
}

// this is for the index page that displays all blos post
export function getSortedPostsData(): PostDataProps[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      frontMatter: matterResult.data as FrontMatter,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.frontMatter.date < b.frontMatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string): Promise<PostDataProps> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  // const processedContent = await remark()
  //   .use(html)
  //   .process(matterResult.content);
  // const contentHtml = processedContent.toString();



  // Combine the data with the id
  return {
    id,
    contentHtml: matterResult.content,
    frontMatter: matterResult.data as FrontMatter,
  };
}
