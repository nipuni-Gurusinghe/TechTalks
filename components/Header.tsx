import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-700 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-2xl tracking-tight text-white">
          <span className="text-amber-400">Tech</span>Talks
        </Link>

        <nav className="space-x-6 text-lg">
          <Link 
            href="/" 
            className="text-gray-300 hover:text-amber-400 transition duration-300 font-medium"
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="text-gray-300 hover:text-amber-400 transition duration-300 font-medium"
          >
            About
          </Link>
          <a 
            href="https://github.com/" 
            target="_blank" 
            rel="noreferrer" 
            className="
              text-gray-300 
              hover:text-amber-400 
              transition 
              duration-300 
              font-medium
            "
          >
          </a>
        </nav>
      </div>
    </header>
  )
}
