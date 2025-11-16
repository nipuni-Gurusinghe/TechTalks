import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import useAuthUser from "../../lib/useAuthUser";
import Header from "../../components/Header";

export default function Register() {
  const { user, loading } = useAuthUser();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/articles"); // redirect if already logged in
    }
  }, [user, loading, router]);

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update the display name in Firebase Auth
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      router.push("/articles");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-gray-800 p-10 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Create Account</h1>

          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 p-3 rounded-lg text-white font-semibold"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-400 mt-5">
            Already have an account?{" "}
            <a href="/auth/login" className="text-amber-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
