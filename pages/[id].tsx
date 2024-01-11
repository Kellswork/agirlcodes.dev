import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { getAllPostIds, getPostData, PostDataProps } from "../utils/util";
import Navigation from "../components/navigation";
import BaseLayout from "../components/baseLayout";
import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { paraisoDark, shadesOfPurple, qtcreatorDark, srcery} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Markdown from "react-markdown";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "../components/footer";
import rehypeRaw from "rehype-raw";

// i like srcry for Golang
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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={postData.frontMatter.description} />
        <meta
          property="og:url"
          content={`https://www.agirlcodes.dev${postData.frontMatter.url}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={postData.frontMatter.title} />
        <meta
          property="og:description"
          content={postData.frontMatter.description}
        />
        <meta
          property="og:image"
          content={`https://www.agirlcodes.dev${postData.frontMatter.image}`}
        />
        <meta
          name="description"
          content={postData.frontMatter.description}
        ></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content={postData.frontMatter.description}
        />
        <meta name="twitter:title" content={postData.frontMatter.title} />
        <meta
          name="twitter:image"
          content={`https://www.agirlcodes.dev${postData.frontMatter.image}`}
        />
        <meta name="twitter:site" content="@kelly_perrie" />
        <meta name="twitter:creator" content="@kelly_perrie" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href={`https://www.agirlcodes.dev${postData.frontMatter.url}`}
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        ></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <title>{postData.frontMatter.title}</title>
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XDTTRJGD01"
      />

      <Script id="google-analytics">
        {`
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());
 
   gtag('config', 'G-XDTTRJGD01');
 `}
      </Script>
      <main>
        <Navigation />
        <BaseLayout>
          <div className=" font-roboto my-10">
            <h2 className="text-headlineLarge font-bold mb-4 max-w-[44rem] mx-auto sm:text-headlineSmall">
              {postData.frontMatter.title}
            </h2>

            <article className="">
              <div className="markdown-content max-w-[44rem] mx-auto ">
                <p className="text-sm font-medium text-purple-7">
                  Published on {postData.frontMatter.fullDate}
                </p>
                <Markdown
                rehypePlugins={[rehypeRaw] as any}
                  components={{
                    code(props: any) {
                      const { children, className, node, ...rest } = props;
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter
                          {...rest}
                          pretag="div"
                          language={match[1]}
                          style={shadesOfPurple}
                          showLineNumbers
                          customStyle={{
                            borderRadius: "4px",
                            marginTop: "8px",
                            marginBottom: "24px",
                            padding: "1rem",
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
      <Analytics />
      <SpeedInsights/>
      <Footer/>
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
