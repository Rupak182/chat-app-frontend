import { create } from "zustand";

export const useThemeStore=create((set)=>({
    theme:"coffee",
    // setTheme:(theme)=>set({theme}),
    setTheme:(theme:string)=>{
        // localStorage.setItem("chat-theme",theme);
        set({theme})
    }


}))