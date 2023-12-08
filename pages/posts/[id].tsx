import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData, PostDataProps } from "../../utils/util";
import Navigation from "../../components/navigation";
import BaseLayout from "../../components/baseLayout";
import Image from "next/image";
import SyntaxHighlighter, {
  Prism,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Markdown from "react-markdown";

interface Props {
  postData: PostDataProps;
}

export default function Post({ postData }: Props) {
  return (
    <div>
      <Head>
        <title>{postData.frontMatter.title}</title>
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        ></link>
      </Head>
      <main>
        <Navigation />
        <BaseLayout>
          <div className=" font-roboto mt-10">
            <h2 className="text-headlineLarge font-bold mb-4 max-w-[44rem] mx-auto sm:text-headlineSmall">
              {postData.frontMatter.title}
            </h2>
            <article className="">
              <div className="markdown-content max-w-[44rem] mx-auto ">
                <Markdown
                  components={{
                    code(props: SyntaxHighlighterProps) {
                      const { children, className, node, ...rest } = props;
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter
                          {...rest}
                          pretag="div"
                          language={match[1]}
                          style={atelierCaveLight}
                          customStyle={{
                            borderRadius: "4px",
                            marginTop:"8px",
                            marginBottom: '24px',
                            padding: '1rem',
                          }}
                          codeTagProps={{
                            style: {
                              fontSize: "14px",
                              fontFamily: `var(--font-spaceMono)`,
                            },
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
