import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import useAuthUser from "../../lib/useAuthUser";
import Header from "../../components/Header";

export default function Login() {
  const { user, loading } = useAuthUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/articles"); // redirect if already logged in
    }
  }, [user, loading]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/articles");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex justify-center items-center bg-black">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl border border-gray-700 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-6">Login</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-amber-500 text-black py-3 rounded font-semibold hover:bg-amber-400 transition"
            >
              Login
            </button>
          </form>

          <p className="text-gray-400 mt-4 text-center">
            Don’t have an account?{" "}
            <a className="text-amber-400" href="/auth/register">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
