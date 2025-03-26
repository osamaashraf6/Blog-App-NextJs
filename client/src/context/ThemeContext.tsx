"use client";
import React, { createContext, useEffect, useState } from "react";

export type ThemeContextType = {
    theme: string;
    toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<string | null>(null); // ✅ Initially `null` to avoid SSR mismatch

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "dark";
        setTheme(storedTheme); // ✅ Update state only on client
    }, []);

    const toggle = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    // ✅ Avoid rendering until the client theme is set
    if (theme === null) return null;

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};
