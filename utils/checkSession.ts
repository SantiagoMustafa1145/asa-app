import useAuth from "@/store/user";

export default function checkSession(): Boolean {
  const { user } = useAuth();
  if (!user) {
    return true;
  }
  return false;
}
