"use client"
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { usePathname, useSearchParams,useRouter } from 'next/navigation';

const AuthChecker = ({children}:{children:React.ReactNode}) => {
    const {authUser,checkAuth,isCheckingAuth,onlineUsers}= useAuthStore()
    // const {theme}= useThemeStore()
    useEffect(()=>{
        checkAuth();
    
    },[checkAuth])  
    
    // console.log(authUser)
    // console.log({onlineUsers})
    // const router = useRouter();

    // const pathname = usePathname();
    
    // useEffect(()=>{
        
    //     if(!authUser){
    //         if(pathname=="/"){
    //             router.replace("/login");
    //         }
    
    //         if(pathname=="/profile"){
    //             router.replace("/login");
    //         }
    
    //         return ;
    //     }
    
    //     if(authUser){
    //         if(pathname==="/login"){
    //             router.replace("/");
    //         }
    
    //         if(pathname==="/signup"){
    //             router.replace("/");
    //         }
    
    //         return ;
    //     }
    // },[authUser])

    if(isCheckingAuth){
        return  <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
     </div>
    }

    return (
         <>{children}</>
    )



}

export default AuthChecker


