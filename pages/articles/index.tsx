import Layout from '../../components/Layout'
import ArticleCard from '../../components/ArticleCard'


type Article = {
  slug: string
  title: string
  description: string
  published_at: string
}


import articlesData from '../../data/articles.json'; 

export default function ArticlesIndexPage() {
  
  const articles: Article[] = articlesData as Article[];

 
  const sortedArticles: Article[] = articles.sort((a, b) => 
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  return (
    <Layout 
      title="All TechTalks Articles — Archive" 
      description="Browse the complete archive of deep dives into Next.js, Serverless, Tailwind, and modern web engineering."
    >
      
      {}
      <header className="text-center py-10 md:py-16 mb-10 border-b border-gray-800">
        <h1 className="
          text-4xl md:text-5xl font-extrabold mb-3 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-amber-400 to-orange-500
        ">
          Article Archive
        </h1>
        <p className="text-xl text-gray-400 max-w-4xl mx-auto mt-4 leading-relaxed">
          The complete list of all publications, sorted by date.
        </p>
      </header>

      {}
      <div className="
        grid 
        gap-8 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3 
        auto-rows-fr 
      ">
        {sortedArticles.map((a) => (
          <div key={a.slug}>
            <ArticleCard article={a} /> 
          </div>
        ))}
      </div>
    </Layout>
  )
}