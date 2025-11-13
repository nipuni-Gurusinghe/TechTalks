import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import Head from 'next/head'
const articles: Article[] = require('../../data/articles.json')

type Article = {
  slug: string
  title: string
  description: string
  content: string
  published_at: string
  image?: string
}

export default function ArticlePage({ article }: { article: Article }) {
  if (!article) {
    return <Layout><p className="text-gray-400">Article not found.</p></Layout>
  }

  const formattedDate = article.published_at 
    ? new Date(article.published_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) 
    : 'Date Unknown'

  return (
    <Layout title={`${article.title} — TechTalks`} description={article.description}>
      <Head>
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        {article.image && <meta property="og:image" content={article.image} />}
      </Head>
      
      <article className="max-w-4xl mx-auto py-12">
        <header className="mb-10 text-center border-b border-gray-800 pb-8">
          <h1 className="
            text-4xl md:text-5xl font-extrabold mb-3 leading-tight 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-teal-400 to-indigo-500
          ">
            {article.title}
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto">{article.description}</p>
          <time className="text-sm text-gray-500 mt-3 block tracking-wider">
            PUBLISHED: {formattedDate}
          </time>
        </header>

        <div 
          className="
            prose 
            prose-invert 
            prose-xl
            prose-a:text-teal-400 
            hover:prose-a:text-teal-300 
            prose-li:marker:text-teal-400 
            prose-code:text-yellow-400 
            prose-pre:bg-gray-800
            prose-headings:text-white
            max-w-none
          "
        >
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = articles.map((a: Article) => ({ params: { slug: a.slug } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug
  const article = articles.find((a) => a.slug === slug) || null
  return { props: { article } }
}
