"use client";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("ThemeProvider must be used within ThemeContextProvider");
    }

    const { theme } = themeContext;

    // ✅ Avoid rendering until the client theme is set
    if (!theme) return null;

    return <div className={theme}>{children}</div>;
};

export default ThemeProvider;
