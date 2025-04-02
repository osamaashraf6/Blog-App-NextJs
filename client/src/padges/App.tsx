"use client"
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/provider/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Announcement from "@/components/Announcement";
// ======================
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App({ children }: any) {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <ThemeContextProvider>
                            <ThemeProvider>
                                <Announcement />
                                <Navbar />
                                {children}
                                <a href="#top" className=" animate-bounce fixed bottom-[50px] right-[50px] flex w-[30px] h-[30px] items-center justify-center rounded-full bg-amber-500 text-4xl">⭡</a>
                                <Footer />
                            </ThemeProvider>
                        </ThemeContextProvider>
                        <ToastContainer position="top-right" autoClose={3000} />
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
        </>
    )
}

export default App