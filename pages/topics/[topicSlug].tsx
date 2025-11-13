import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import ArticleCard from '../../components/ArticleCard';
import Link from 'next/link';

type Article = {
  slug: string;
  title: string;
  description: string;
  published_at: string;
};

type TopicProps = {
  topic: string;
  articles: Article[];
};

const allArticles: Article[] = require('../../data/articles.json') as Article[];

const filterArticlesByTopic = (articles: Article[], topicSlug: string): Article[] => {
  const lowerCaseSlug = topicSlug.toLowerCase();
  
  return articles.filter(article => {
    const titleAndDesc = (article.title + article.description).toLowerCase();
    if (lowerCaseSlug === 'nextjs' && titleAndDesc.includes('next.js')) return true;
    if (lowerCaseSlug === 'serverless' && titleAndDesc.includes('serverless')) return true;
    if (lowerCaseSlug === 'tailwind' && (titleAndDesc.includes('tailwind') || titleAndDesc.includes('css'))) return true;
    if (lowerCaseSlug === 'ai' && titleAndDesc.includes('ai')) return true;
    return titleAndDesc.includes(lowerCaseSlug);
  }).sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { topicSlug: 'nextjs' } },
    { params: { topicSlug: 'serverless' } },
    { params: { topicSlug: 'tailwind' } },
    { params: { topicSlug: 'ai' } },
  ];

  return {
    paths,
    fallback: false, 
  };
};

export const getStaticProps: GetStaticProps<TopicProps> = async (context) => {
  const topicSlug = context.params?.topicSlug as string;
  const filteredArticles = filterArticlesByTopic(allArticles, topicSlug);
  if (filteredArticles.length === 0) {
    return { props: { topic: topicSlug, articles: [] } };
  }
  return {
    props: {
      topic: topicSlug,
      articles: filteredArticles,
    },
  };
};

export default function TopicPage({ topic, articles }: TopicProps) {
  const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1).toLowerCase();

  return (
    <Layout 
      title={`${formattedTopic} Articles | TechTalks`} 
      description={`All articles focused on ${formattedTopic} development and technologies.`}
    >
      <header className="text-center py-10 md:py-16 mb-10 border-b border-gray-800">
        <h1 className="
          text-4xl md:text-5xl font-extrabold mb-3 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-amber-400 to-orange-500
        ">
          Topic: {formattedTopic}
        </h1>
        <p className="text-xl text-gray-400 max-w-4xl mx-auto mt-4 leading-relaxed">
          {articles.length} insights focused on {formattedTopic} development.
        </p>
      </header>

      {articles.length > 0 ? (
        <div className="
          grid 
          gap-8 
          sm:grid-cols-1 
          md:grid-cols-2 
          xl:grid-cols-3 
          auto-rows-fr 
        ">
          {articles.map((a) => (
            <div key={a.slug}>
              <ArticleCard article={a} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-2xl text-gray-500">No articles found for this topic yet.</p>
          <Link href="/" className="mt-4 inline-block text-amber-400 hover:text-amber-300 transition-colors">
            Return to Homepage
          </Link>
        </div>
      )}
    </Layout>
  );
}
