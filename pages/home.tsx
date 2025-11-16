import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout title="Welcome to TechTalks" description="TechTalks — Developer platform.">

      <div className="text-center py-24 max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          Welcome to TechTalks
        </h1>

        <p className="text-gray-300 text-lg mt-6 leading-relaxed">
          TechTalks is a modern developer-focused knowledge hub...
        </p>

        <p className="text-gray-400 text-lg mt-4 leading-relaxed">
          Explore Next.js, Firebase, AI workflows, DevOps automation and more.
        </p>

        <p className="text-gray-500 text-base mt-6 italic">
          Login to access full articles and exclusive insights.
        </p>
      </div>

    </Layout>
  );
}
