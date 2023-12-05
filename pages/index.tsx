import Head from 'next/head';
import { PostDataProps, getSortedPostsData } from '../utils/util';
import Navigation from '../components/navigation';
import MainContent from '../components/mainContent';
import Footer from '../components/footer';

interface HomeProps {
  allPostsData : PostDataProps[]
}

export default function Home({allPostsData}: HomeProps) {
  return (
    <div className='border-t-8 border-purple-5'>
      <Navigation/>
      <MainContent/>
      <Footer/>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}