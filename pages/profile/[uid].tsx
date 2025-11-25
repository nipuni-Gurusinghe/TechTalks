import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import useAuthUser from "../../lib/useAuthUser";
import Header from "../../components/Header";

export default function UserProfile() {
  const router = useRouter();
  const { uid } = router.query;

  const { user, loading: authLoading } = useAuthUser();

  const [profileName, setProfileName] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const loadProfile = async () => {
      try {
        const ref = doc(db, "users", uid as string);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setProfileName(data.name || "No Name");
          setProfilePic(
            data.photoURL ||
              `https://placehold.co/200x200/22c55e/ffffff?text=${(data.name || "U")
                .charAt(0)
                .toUpperCase()}`
          );
          setUserEmail(data.email || "");
        } else {
          setProfileName("User Not Found");
          setProfilePic(null);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }

      setLoading(false);
    };

    loadProfile();
  }, [uid]);

  // redirect unauthenticated user
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [authLoading, user]);

  if (loading || authLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center text-gray-300">
          Loading profile...
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-900 text-gray-200 border border-gray-700 rounded-xl shadow-lg">

        <div className="flex items-center space-x-6">
          <img
            src={
              profilePic ||
              "https://placehold.co/200x200/4b5563/ffffff?text=U"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border border-gray-600 object-cover"
          />

          <div>
            <h1 className="text-2xl font-semibold text-white">
              {profileName}
            </h1>
            <p className="text-gray-400">{userEmail}</p>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <h2 className="text-xl font-semibold mb-2 text-amber-400">
          Profile Details
        </h2>

        <p><strong>Name:</strong> {profileName}</p>
        <p><strong>Email:</strong> {userEmail}</p>
        <p><strong>User ID:</strong> {uid}</p>

      </div>
    </>
  );
}
