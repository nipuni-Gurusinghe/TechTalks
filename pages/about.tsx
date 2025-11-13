

import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout 
      title="About TechTalks — Mission & Stack" 
      description="Learn about the mission, values, and technology powering the TechTalks platform."
    >
      <div className="max-w-4xl mx-auto py-8">
        
        
        <header className="mb-10 text-center border-b border-gray-800 pb-6">
          <h1 className="
            text-4xl md:text-5xl font-extrabold mb-3 leading-tight 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-amber-400 to-orange-500
          ">
            Our Mission
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Demystifying the future of web development, one deep-dive at a time.
          </p>
        </header>

        
        <div className="space-y-10">
          <section>
            <h2 className="text-3xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              The TechTalks Vision
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              TechTalks was built to be the essential resource for ambitious developers navigating the complex, rapidly evolving landscape of modern web architecture. We move beyond basic tutorials to provide deep, practical insights into serverless computing, cutting-edge UI frameworks, and high-performance engineering practices. Our goal is to empower developers to build faster, more scalable, and more reliable applications.
            </p>
          </section>

          {/* Content Section: Technology */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              Built on the Modern Stack
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              This platform is a demonstration of the exact principles we preach. It is architected for **maximal speed and SEO performance** using industry-leading tools:
            </p>
            
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-300 ml-4">
              <li className="text-amber-400">
                <span className="text-white font-medium">Next.js (SSG)</span>: For Static Site Generation, ensuring instantaneous page loads and perfect SEO crawling.
              </li>
              <li className="text-amber-400">
                <span className="text-white font-medium">Tailwind CSS</span>: For a responsive, utility-first design system that keeps the UI codebase minimal and highly maintainable.
              </li>
              <li className="text-amber-400">
                <span className="text-white font-medium">Headless Data</span>: Content is decoupled (using local JSON, scalable to a Headless CMS), providing flexibility and faster content delivery.
              </li>
            </ul>
          </section>

          {}
          <section className="bg-gray-800 p-6 rounded-xl border-l-4 border-amber-500 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-3">
              Connect with the Creator
            </h2>
            <p className="text-gray-300">
              This project was developed by Nipuni Gurusinghe to showcase expertise in full-stack development and high-performance web engineering.
              <br className="mt-2"/>
              {}
              <a 
                href="https://nipuni-gurusinghe-portfolio.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors mt-2 inline-block"
              >
                View Portfolio &rarr;
              </a>
              
            </p>
          </section>
          
        </div>
      </div>
    </Layout>
  )
}