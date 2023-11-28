import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData, PostDataProps } from "../../utils/util";

interface Props {
  postData : PostDataProps;
}

export default function Post({ postData }: Props) {
  return (
    <Layout>
      <Head>
        <title>{postData.frontMatter.title}</title>
      </Head>
      <p>{postData.frontMatter.title}</p>
      <br />
      <p>{postData.frontMatter.date}</p>
      <br />

      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
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
  params: {id: string}
}

export async function getStaticProps({ params }: Params) {
  console.log("params", params);
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
