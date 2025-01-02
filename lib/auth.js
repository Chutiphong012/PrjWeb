import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const router = useRouter();
    
    useEffect(() => {
      const userId = localStorage.getItem("userId"); // ตรวจสอบ Token จาก localStorage
      if (!userId) {
        router.push("/login"); // หากไม่มี Token ให้ redirect ไปหน้า login
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
