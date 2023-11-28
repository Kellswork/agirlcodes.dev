import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { PostDataProps, getSortedPostsData } from '../utils/util';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

interface HomeProps {
  allPostsData : PostDataProps[]
}

export default function Home({allPostsData}: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className="text-3xl font-bold underline">Kelechi Ogbonna</p>
      </section>
      <section >
        <h2 >Blog</h2>
        <ul>
          {allPostsData.map(({ id, frontMatter }) => (
            <li key={id}>
              {frontMatter.title}
              <br />
              {id}
              <br />
              {frontMatter.date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}