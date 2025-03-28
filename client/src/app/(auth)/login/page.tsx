import LazyLoadingRoute from "@/features/loading/LazyLoadingRoute";
import LoginPage from "@/padges/Login";
import { Metadata } from "next";
import dynamic from "next/dynamic";
export const metadata: Metadata = {
    title: {
        absolute: "Login"
    },
};
// const LoginPage = dynamic(() => import("@/pages/Login"), {
//     loading: () => <LazyLoadingRoute />,
//     // ssr: false,
// });
function Login() {
    return (
        <>
            <LoginPage />
        </>
    )
}

export default Login
