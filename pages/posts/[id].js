import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ blog }) {
  return (
    <Layout>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{blog.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={blog.createdAt} />
        </div>
        <div className={utilStyles.lightText}>
          {blog.content}
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  }

  const res = await fetch(process.env.ENDPOINT + '/blogs', key)
  const repos = await res.json()

  const paths = repos.contents.map(repo => `/posts/${repo.id}`)
  return {paths, fallback: false}
}

export const getStaticProps = async context => {
  const id = context.params.id

  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  }
  const fetchUrl = new URL('/blogs/', process.env.ENDPOINT)
  const res = await fetch(fetchUrl + id, key)
  const blog = await res.json()

  return {
    props: {
      blog: blog,
    },
  }
}