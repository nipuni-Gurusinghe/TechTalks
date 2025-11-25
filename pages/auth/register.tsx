import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Ensure that '../../lib/firebase' exports auth, storage, and db instances
import { auth, storage, db } from "../../lib/firebase"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import useAuthUser from "../../lib/useAuthUser";
import Header from "../../components/Header";
import Link from "next/link"; 

// --- TypeScript Interface for Message Props ---
interface MessageProps {
  message: string;
  type: 'error' | 'success';
}

// Custom Message Component to replace alert()
// Using MessageProps interface to define prop types
const Message: React.FC<MessageProps> = ({ message, type }) => (
  <div 
    className={`p-3 rounded-lg text-sm mb-4 ${
      type === 'error' ? 'bg-red-800 text-red-100 border border-red-700' : 'bg-green-800 text-green-100 border border-green-700'
    }`}
  >
    {message}
  </div>
);

export default function Register() {
  const { user, loading } = useAuthUser();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  // Using the same interface for the state hook
  const [message, setMessage] = useState<MessageProps | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace("/articles");
    }
  }, [user, loading, router]);

  // Generate preview URL for selected image
  useEffect(() => {
    if (!profilePic) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(profilePic);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [profilePic]);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages

    if (!name || !email || !password) {
      setMessage({ message: "All fields are required!", type: 'error' }); // FIX: Changed 'text' to 'message'
      return;
    }

    try {
      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Use the user object directly from the credential, which is safer than auth.currentUser
      const newUser = userCredential.user; 

      setUploading(true);

      // 2️⃣ Upload profile picture if provided
      let photoURL: string | null = null;
      if (profilePic) {
        // Use the user's uid for a unique path
        const storageRef = ref(storage, `profilePics/${newUser.uid}/${profilePic.name}`); 
        await uploadBytes(storageRef, profilePic);
        photoURL = await getDownloadURL(storageRef);
      }
      setUploading(false);

      // 3️⃣ Update Auth profile (displayName and photoURL)
      await updateProfile(newUser, { displayName: name, photoURL });
      // Reloading can be helpful to ensure the next component (Header) gets the updated Auth user object immediately
      await newUser.reload(); 

      // 4️⃣ Save user info in Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        uid: newUser.uid,
        name: name,
        email: newUser.email,
        photoURL: photoURL,
        createdAt: new Date(), // Using new Date() here, but serverTimestamp() is generally preferred
      });

      // FIX: Changed 'text' to 'message'
      setMessage({ message: "Registration successful! Redirecting...", type: 'success' });
      // 5️⃣ Redirect after registration (allow brief moment for user to see success message)
      setTimeout(() => router.push("/articles"), 1000);
      
    } catch (error: any) {
      console.error("Registration failed:", error);
      // FIX: Changed 'text' to 'message'
      setMessage({ message: error.message || "Registration failed. Please try again.", type: 'error' });
      setUploading(false);
    }
  };

  if (loading || (!loading && user)) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-gray-800 p-10 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Create Account</h1>

          {/* Display Message/Error */}
          {message && <Message {...message} />}

          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-amber-500 focus:border-amber-500"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-amber-500 focus:border-amber-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-amber-500 focus:border-amber-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Profile Picture Upload */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Profile Picture (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files ? e.target.files[0] : null)}
                className="w-full text-gray-300 bg-gray-700 border border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-gray-900 hover:file:bg-amber-400"
              />
              {previewUrl && (
                <div className="mt-4 flex flex-col items-center">
                  <p className="text-gray-400 text-sm mb-2">Preview:</p>
                  <img
                    src={previewUrl}
                    alt="avatar preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-amber-500 shadow-lg"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 p-3 rounded-lg text-white font-semibold transition duration-200 disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? "Uploading Image..." : "Register"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-5">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-amber-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}