import { axiosInstance } from '@/lib/axios';
import axios from 'axios';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest,response:NextResponse) {

    let isAuthenticated=false ;

    const checkAuth= async () => {
      try {
          const response = await fetch("http://localhost:5001/auth/check",{
            method:"get",
            credentials:"include"
          });
          console.log("response",response)

          if(!response.ok){
              isAuthenticated=false;
              return;
            }
          isAuthenticated=true;
      } catch (error) {
          console.log("Error in checkAuth", error)
          isAuthenticated=false;
          return ;
      }
    }

  await checkAuth()
  if (request.nextUrl.pathname==='/') {
    if(!isAuthenticated){
        return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith('/signup') || request.nextUrl.pathname.startsWith('/login')) {
    if(isAuthenticated){
        return NextResponse.redirect(new URL('/', request.url))
    }
  }

    return NextResponse.next(); 


}

export const config = {
    matcher: ['/','/profile',"/login","/signup"],
}
