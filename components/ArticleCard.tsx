
import Link from 'next/link'

type Article = {
  slug: string
  title: string
  description: string
  published_at: string
}

export default function ArticleCard({ article, className = '' }: { article: Article, className?: string }) {
  return (
    <article 
      className={`
        bg-gray-800 
        hover:bg-gray-700 
        transition-all 
        duration-300 
        rounded-xl 
        shadow-xl 
        hover:shadow-2xl 
        p-6 
        border border-gray-700
        ${className}
      `}
    >
      <h3 className="text-2xl font-extrabold text-white mb-2">
        <Link 
          href={`/articles/${article.slug}`} 
          className="hover:text-amber-400 transition duration-300" 
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-gray-400 leading-relaxed">{article.description}</p>
      <Link 
        href={`/articles/${article.slug}`} 
        className="
          mt-4 
          inline-flex 
          items-center 
          text-amber-400 
          font-medium 
          hover:text-amber-300 
          transition-colors
        "
      >
        Read Article &rarr;
      </Link>
    </article>
  )
}