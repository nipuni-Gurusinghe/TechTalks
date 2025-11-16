export default function checkLogin(): boolean {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("authToken");
  return !!token;
}
