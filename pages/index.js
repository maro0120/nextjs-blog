import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'


const Home = ({blogs}) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction tutorial]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
            {blogs.map(blog => (
            <li className={utilStyles.listItem} key={blog.id}>
                <Link href={`/posts/${blog.id}`}>
                <a>{blog.title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                <Date dateString={blog.createdAt} />
                </small>
            </li>
            ))}
        </ul>
      </section>
    </Layout>
  )
}
export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const fetchUrl = process.env.ENDPOINT + '/blogs'
  const res = await fetch(fetchUrl, key);

  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    },
  };
};

export default Home;