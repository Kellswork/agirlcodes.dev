import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData, PostDataProps } from "../../utils/util";
import Navigation from "../../components/navigation";
import BaseLayout from "../../components/baseLayout";

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
              <h2 className="text-headlineMedium font-bold">{postData.frontMatter.title}</h2>
              <div className="" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
  console.log("params", params);
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
