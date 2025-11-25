import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout title="Welcome to TechTalks" description="TechTalks — Developer platform.">

      <div className="text-center py-24 max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          Welcome to TechTalks
        </h1>

        <p className="text-gray-300 text-lg mt-6 leading-relaxed">
          TechTalks was built to be the essential resource for ambitious developers navigating the complex, rapidly evolving landscape of modern web architecture. We move beyond basic tutorials to provide deep, practical insights into serverless computing, cutting-edge UI frameworks, and high-performance engineering practices. Our goal is to empower developers to build faster, more scalable, and more reliable applications.
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
