import { useEffect, useState } from "react";
import checkLogin from "../utils/checkLogin";
import ArticlesPage from "./articles";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const isLogged = checkLogin();
    setLoggedIn(isLogged);

    if (!isLogged) {
      router.replace("/home");
    }
  }, []);

  // Show nothing until user is checked
  if (loggedIn === null) return null;

  return loggedIn ? <ArticlesPage /> : null;
}
