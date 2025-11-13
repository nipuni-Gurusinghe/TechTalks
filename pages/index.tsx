import Layout from '../components/Layout'
import ArticleCard from '../components/ArticleCard'

type Article = {
  slug: string
  title: string
  description: string
  published_at: string
}

import articlesData from '../data/articles.json'; 

export default function Home() {
  
  const articles: Article[] = articlesData as Article[];

  const sortedArticles: Article[] = articles.sort((a, b) => 
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  return (
    <Layout 
      title="TechTalks — Modern Web Insights" 
      description="The definitive source for Next.js, Tailwind, and cutting-edge web development trends."
    >
      <div className="text-center py-20 md:py-32 mb-12 border-b border-gray-800">
        <h1 className="
          text-5xl md:text-7xl font-extrabold mb-4 
          tracking-tighter 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-amber-400 to-orange-500 
        ">
          TechTalks.
        </h1>
        <p className="text-xl text-gray-400 max-w-4xl mx-auto mt-4 leading-relaxed">
          The cutting edge of web dev: Deep dives into Next.js, Serverless, AI in engineering, and Atomic CSS design systems.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
        Latest Insights ({sortedArticles.length} Articles)
      </h2>

      <div className="
        grid 
        gap-6 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3 
        auto-rows-fr 
      ">
        {sortedArticles.map((a, index) => {
          let gridClass = ''
          if (index === 0) {
            gridClass = 'md:col-span-2' 
          } else if (index === 1) {
            gridClass = 'md:row-span-2 hidden xl:block'
          }

          return (
            <div key={a.slug} className={gridClass}>
              <ArticleCard article={a} className={gridClass} /> 
            </div>
          )
        })}

        <div className="
          bg-gray-800 
          rounded-xl 
          shadow-xl 
          p-6 
          border border-amber-600 
          text-center 
          flex flex-col 
          justify-center 
          items-center 
          md:col-span-2 xl:col-span-1 
          text-gray-300
        ">
          <p className="text-2xl font-extrabold text-amber-400 mb-2">
            Want to learn more?
          </p>
          <p className="text-gray-400">
            Subscribe to the TechTalks newsletter for weekly Edge Computing tips!
          </p>
        </div>
      </div>
    </Layout>
  )
}