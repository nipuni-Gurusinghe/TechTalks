import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";


export default function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          
          await currentUser.reload();
        } catch (err) {
          console.error("Failed to reload user:", err);
        }
      }

      
      setUser(currentUser);
      setLoading(false);

      
      console.log("%c🔐 AUTH DEBUG", "color: #ff9800; font-weight: bold;");
      console.log("Loading:", false);
      console.log("User:", currentUser);
      console.log("displayName:", currentUser?.displayName);
      console.log("photoURL:", currentUser?.photoURL);
    });

    return () => unsub();
  }, []);

  return { user, loading };
}
