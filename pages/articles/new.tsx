import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import useAuthUser from "../../lib/useAuthUser";

export default function NewArticlePage() {
  const { user, loading } = useAuthUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  // Automatically generate slug from title
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, ""); // remove special characters
      setSlug(generatedSlug);
    }
  }, [title]);

  if (loading) return null;
  if (!user) {
    router.replace("/auth/login");
    return null;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !content) {
      alert("All fields required!");
      return;
    }

    try {
      await addDoc(collection(db, "articles"), {
        title,
        slug, // auto-generated
        content,
        author_uid: user.uid,
        author_name: user.displayName || "Anonymous",
        published_at: serverTimestamp(),
      });

      alert("Article published!");
      router.push("/articles");
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Failed to publish article");
    }
  };

  return (
    <Layout title="Write a New Article">
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6">Write New Article</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-300">Title</label>
            <input
              type="text"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Content</label>
            <textarea
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 h-60"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          {/* Hidden slug input */}
          <input type="hidden" value={slug} />

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded font-semibold"
          >
            Publish Article
          </button>
        </form>
      </div>
    </Layout>
  );
}
