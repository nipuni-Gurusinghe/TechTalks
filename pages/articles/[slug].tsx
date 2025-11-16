import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Head from "next/head";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

type Article = {
  title: string;
  description: string;
  content: string;
  author_name: string;
  published_at: any;
  image?: string;
  slug: string;
};

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        const q = query(collection(db, "articles"), where("slug", "==", slug));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data() as Article;
          setArticle(data);
        } else {
          setArticle(null);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <Layout><p className="text-center py-20 text-white">Loading...</p></Layout>;
  if (!article) return <Layout><p className="text-center py-20 text-gray-400">Article not found.</p></Layout>;

  const formattedDate = article.published_at?.toDate
    ? article.published_at.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date Unknown";

  return (
    <Layout title={`${article.title} — TechTalks`} description={article.description}>
      <Head>
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        {article.image && <meta property="og:image" content={article.image} />}
      </Head>

      <article className="max-w-4xl mx-auto py-12 px-4">
        <header className="mb-10 text-center border-b border-gray-800 pb-8">
          <h1 className="
            text-4xl md:text-5xl font-extrabold mb-3 leading-tight 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-teal-400 to-indigo-500
          ">
            {article.title}
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto">{article.description}</p>
          <p className="text-gray-400 mt-2">By {article.author_name}</p>
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
  );
}
