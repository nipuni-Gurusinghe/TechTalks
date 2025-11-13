

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
   
    <footer className="bg-gray-900 border-t border-amber-500/20 mt-20 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        
        {}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10 mb-10">
          
          {}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-extrabold text-2xl tracking-tight text-white mb-4 block">
              <span className="text-amber-400">Tech</span>Talks
            </Link>
            <p className="text-gray-400 text-sm">
              The essential source for cutting-edge web development and technology insights.
            </p>
          </div>

          {}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Home</Link></li>
              <li><Link href="/articles" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">All Articles</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Topics</h3>
            <ul className="space-y-3">
              <li><Link href="/topics/nextjs" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Next.js & React</Link></li>
              <li><Link href="/topics/serverless" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Serverless</Link></li>
              <li><Link href="/topics/tailwind" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">CSS & UI/UX</Link></li>
              <li><Link href="/topics/ai" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">AI in Dev</Link></li>
            </ul>
          </div>

          {}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">Get the latest tech deep-dives delivered weekly.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="p-2 border border-gray-600 rounded-l-md bg-gray-800 text-white w-full text-sm focus:border-amber-500"
              />
              <button 
                type="submit" 
                className="bg-amber-500 text-gray-900 font-bold p-2 rounded-r-md hover:bg-amber-400 transition-colors text-sm"
              >
                Go
              </button>
            </form>
          </div>
        </div>

        {}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="order-2 md:order-1 mt-4 md:mt-0">
            © {currentYear} TechTalks. All rights reserved. Built with Next.js & Tailwind.
          </p>

          {}
          <div className="flex space-x-4 order-1 md:order-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors" aria-label="Twitter">
              {}
              
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors" aria-label="GitHub">
              
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors" aria-label="LinkedIn">
              
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}