// // context/i18n.js
// import { createContext, useState, useEffect } from "react";

// export const LanguageContext = createContext({
//   locale: "en",
//   changeLanguage: () => { },
// });

// export const LanguageProvider = ({ children }: any) => {
//   const [locale, setLocale] = useState("en");

//   useEffect(() => {
//     // Run only on the client side
//     const storedLocale = localStorage.getItem("locale");
//     if (storedLocale) {
//       setLocale(storedLocale);
//     }
//   }, []);

//   const changeLanguage: any = (lang: string) => {
//     setLocale(lang);
//     localStorage.setItem("locale", lang);
//   };

//   return (
//     <LanguageContext.Provider value={{ locale, changeLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };
