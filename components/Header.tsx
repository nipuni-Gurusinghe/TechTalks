import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import useAuthUser from "../lib/useAuthUser";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Header() {
  const router = useRouter();
  // Assuming useAuthUser gives { user: firebase.User | null, loading: boolean }
  const { user, loading } = useAuthUser(); 
  const [showProfile, setShowProfile] = useState(false);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        // 1. Try to fetch the document from the 'users' collection
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // 2. Use data from Firestore (most reliable source)
          const data = docSnap.data();
          setProfileName(data.name || user.email || "User Profile"); // Fallback to email if name is missing
          setProfilePic(data.photoURL || `https://placehold.co/150x150/22c55e/ffffff?text=${(data.name || user.email || 'U').charAt(0).toUpperCase()}`);
        } else {
          // 3. Fallback to Firebase Auth object data
          // Use user.email as the name if displayName is null
          setProfileName(user.displayName || user.email || "Anonymous");
          
          // Generate a visually appealing placeholder avatar using the first letter of the name/email
          const initial = (user.displayName || user.email || 'A').charAt(0).toUpperCase();
          setProfilePic(`https://placehold.co/150x150/22c55e/ffffff?text=${initial}`);
        }
      } else {
        // User logged out
        setProfileName(null);
        setProfilePic(null);
      }
    };
    fetchUserProfile();
    // Dependency array: only re-run when the user object changes
  }, [user]); 

  // Close profile box if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="font-extrabold text-2xl tracking-tight text-white">
          <span className="text-amber-400">Tech</span>Talks
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-lg">

          {/* Home link */}
          <Link href="/" className="text-gray-300 hover:text-amber-400 transition">Home</Link>

          {/* Loading */}
          {loading && <span className="text-gray-400 text-sm italic">Checking auth...</span>}

          {/* Login/Register */}
          {!loading && !user && (
            <>
              <Link
                href="/auth/login"
                className="text-gray-300 hover:text-amber-400 transition font-medium"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="text-gray-300 hover:text-amber-400 transition font-medium"
              >
                Register
              </Link>
            </>
          )}

          {/* Logged-in user */}
          {!loading && user && (
            <div className="flex items-center space-x-4 relative" ref={profileRef}>

              {/* Avatar Button */}
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center text-gray-300 hover:text-amber-400 transition font-medium"
                aria-expanded={showProfile}
              >
                <img
                  // Use the fetched profilePic or the dynamic placeholder
                  src={profilePic || `https://placehold.co/150x150/4b5563/ffffff?text=U`} 
                  alt={`${profileName || 'User'}'s avatar`}
                  className="w-8 h-8 rounded-full border border-gray-500 object-cover"
                  onError={(e) => { // Robust fallback for image loading errors
                    e.currentTarget.onerror = null; // prevents infinite loop
                    e.currentTarget.src = `https://placehold.co/150x150/4b5563/ffffff?text=X`;
                  }}
                />
              </button>

              {/* Profile Dropdown */}
              <div
                className={`absolute right-0 top-12 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-xl p-4 text-gray-300 transition-all duration-300 origin-top-right ${
                  showProfile ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {/* Displaying fetched name or email */}
                <p className="font-semibold text-white">{profileName || "Loading..."}</p> 
                <p className="text-sm truncate text-gray-400">{user.email}</p>
                
                <hr className="my-2 border-gray-700" />
                
                <Link 
                    href={`/profile/${user.uid}`} 
                    className="block text-sm py-1 hover:text-amber-400 transition"
                    onClick={() => setShowProfile(false)}
                >
                    View Profile
                </Link>
                <button
                    onClick={async () => {
                      await auth.signOut();
                      setShowProfile(false);
                      router.push("/");
                    }}
                    className="w-full text-left text-sm py-1 mt-1 text-red-400 hover:text-red-300 transition"
                  >
                    Logout
                  </button>
              </div>

            </div>
          )}
        </nav>
      </div>
    </header>
  );
}