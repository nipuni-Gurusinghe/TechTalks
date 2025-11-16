import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import useAuthUser from "../lib/useAuthUser";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export default function ArticlesPage() {
  const { user, loading } = useAuthUser();
  const router = useRouter();

  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/home"); // redirect if not logged in
      return;
    }

    const fetchArticles = async () => {
      try {
        const q = query(
          collection(db, "articles"),
          orderBy("published_at", "desc")
        );

        const snapshot = await getDocs(q);

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setArticles(list);
      } catch (error) {
        console.error("Error loading articles", error);
      }
    };

    if (user) fetchArticles();
  }, [user, loading, router]);

  if (!user) return null;

  return (
    <Layout title="TechTalks — Articles" description="Latest articles">
      <header className="flex flex-col sm:flex-row justify-between items-center py-14">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Latest Articles
        </h1>
        <button
          onClick={() => router.push("/articles/new")}
          className="mt-4 sm:mt-0 bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded font-semibold"
        >
          Write New Article
        </button>
      </header>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
        {articles.map((a: any) => (
          <div key={a.id} className="p-6 border rounded-lg bg-gray-800 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold">{a.title}</h2>
              <p className="text-gray-400 text-sm">{a.author_name}</p>
              <p className="text-gray-300 mt-2">{a.content?.slice(0, 120)}...</p>
            </div>
            <button
              onClick={() => router.push(`/articles/${a.slug}`)}
              className="mt-4 text-amber-400 hover:text-amber-500 font-semibold flex items-center gap-1"
            >
              Read Full Article →
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
