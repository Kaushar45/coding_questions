// pages/404.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // You can redirect the user after a few seconds or any other logic
    setTimeout(() => {
      router.push("/"); // Redirect to homepage after 3 seconds
    }, 3000);
  }, [router]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p>You will be redirected to the homepage shortly...</p>
      <p>
        <Link href="/">Go back to the homepage</Link>
      </p>
    </div>
  );
};

export default NotFound;
