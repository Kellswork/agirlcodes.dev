import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData, PostDataProps } from "../../utils/util";
import Navigation from "../../components/navigation";
import BaseLayout from "../../components/baseLayout";
import Image from "next/image";
import hljs from "highlight.js";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Markdown from "react-markdown";

interface Props {
  postData: PostDataProps;
}

export default function Post({ postData }: Props) {
 
  return (
    <div>
      <Head>
        <title>{postData.frontMatter.title}</title>

      </Head>
      <main>
        <Navigation />
        <BaseLayout>
          <div className="sections flex justify-between">
            <article className="max-w-[44rem] font-roboto">
              <h2 className="text-headlineMedium font-bold mb-4">
                {postData.frontMatter.title}
              </h2>
              <Image
                className="rounded mb-4"
                src={postData.frontMatter.image}
                width={715}
                height={300}
                alt="image for the article title"
              />
              <div className="markdown-content">
                <Markdown
                
                  components={{
                    code(props) {
                      const { children, className, node, ...rest } = props;
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter
                          {...rest}
                          pretag="div"
                          language={match[1]}
                          style={vscDarkPlus}
                          customStyle={{
                            borderRadius: "4px",
                          }}
                        >
                          {String(children).replace(/>\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {postData.contentHtml}
                </Markdown>
              </div>
            </article>
            <article className="table-of-content">table of content</article>
          </div>
        </BaseLayout>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

type Params = {
  params: { id: string };
};

export async function getStaticProps({ params }: Params) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
