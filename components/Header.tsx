import Link from "next/link";
import { useRouter } from "next/router";
import useAuthUser from "../lib/useAuthUser";
import { auth } from "../lib/firebase";

export default function Header() {
  const router = useRouter();
  const { user, loading } = useAuthUser();

  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="font-extrabold text-2xl tracking-tight text-white">
          <span className="text-amber-400">Tech</span>Talks
        </Link>

        {/* Navigation */}
        <nav className="space-x-6 text-lg flex items-center">
          <Link href="/" className="text-gray-300 hover:text-amber-400 transition">
            Home
          </Link>

          {/* Loading State */}
          {loading && (
            <span className="text-gray-400 text-sm italic">Checking auth...</span>
          )}

          {/* When NOT loading */}
          {!loading && !user && (
            <>
              <button
                onClick={() => router.push("/auth/login")}
                className="text-gray-300 hover:text-amber-400 transition font-medium"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/auth/register")}
                className="text-gray-300 hover:text-amber-400 transition font-medium"
              >
                Register
              </button>
            </>
          )}

          {!loading && user && (
            <button
              onClick={async () => {
                await auth.signOut();
                router.push("/");
              }}
              className="text-gray-300 hover:text-amber-400 transition font-medium"
            >
              Logout
            </button>
          )}
        </nav>

      </div>
    </header>
  );
}
