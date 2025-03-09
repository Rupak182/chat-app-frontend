"use client"
import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { NoChatSelected } from '../components/NoChatSelected'
import { Sidebar } from '../components/Sidebar'
import { ChatContainer } from '../components/ChatContainer'
import { IoIosSettings, IoMdHome } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { IoBandageSharp } from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";
import { MdFormatListBulleted } from "react-icons/md";
import { FaBullhorn } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FcTodoList } from "react-icons/fc";
import { TbScreenShare } from "react-icons/tb";
import { MdNotificationsOff } from "react-icons/md";
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import ChatContainer2 from '@/components/ChatContainer2'

const HomePage = () => {
 const {selectedUser}= useChatStore()
  const {authUser}= useAuthStore()
  const router = useRouter();
   useEffect(()=>{
    if(!authUser){
      router.replace("/login")
    }
   },[authUser])

   console.log("home:",authUser)
  return (
    <div className='h-screen bg-base-200'>
      <div className="flex items-center pt-20 px-4 justify-center h-full w-full">
          <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-6rem)]">
              <div className='flex h-full rounded-lg  overflow-hidden '>
                 <div className="left w-12 items-center h-full border-base-300 border-r   flex flex-col gap-6 mt-2 text-zinc-600">
                      <IoMdHome size={"1.5rem"}  />
                      <AiFillMessage size={"1.5rem"} className='text-primary'/>
                      <IoBandageSharp size={"1.5rem"}/>
                      <BsGraphUp size={"1.5rem"}/>
                      <FaBullhorn size={"1.5rem"}/>
                      <FaAddressBook size={"1.5rem"}/>
                      <MdFormatListBulleted size={"1.5rem"}/>
                      <FaImage size={"1.5rem"}/>
                      <FcTodoList size={"1.5rem"}/>
                      <IoIosSettings size={"1.5rem"}/>
                      </div>

                      <aside className="h-full w-full lg:w-full border-r border-base-300 flex flex-col">
                      <div className='w-full  bg-white py-2 px-2 border-b border-base-300'>
                      
                      <div className='flex  items-center justify-between  '>
                        <div className='flex gap-1'>
                        <AiFillMessage  size={"1.5rem"} />
                        <span>Chats</span>
                        </div>
                        <div className='space-x-4'>
                        <button className='p-2 px-3 rounded-md border w-fit'>Refresh</button>
                        <button className='p-2 px-3 rounded-md border w-fit'>Help</button>
                        <button className='p-2 px-3 rounded-md border w-fit'>Refresh</button>                        
                        <button className='p-2 px-3 rounded-md border w-fit'>5/6 Phones</button>
                        <button className='p-2 px-3 rounded-md border w-fit'><TbScreenShare/></button>
                        <button className='p-2 px-3 rounded-md border w-fit'><MdNotificationsOff/></button>
                        <button className='p-2 px-3 rounded-md border w-fit'><MdFormatListBulleted/></button>
                        
                        </div>
                      </div>
                      </div>
                      <div className='flex h-[90%] '>
                      <Sidebar/>
                      {!selectedUser? <NoChatSelected/>:<ChatContainer/>}
                      </div>
                      </aside>
                      <div className="left w-12 items-center h-full border-base-300 border-r   flex flex-col gap-6 mt-2 text-zinc-600">
                      <IoMdHome size={"1.5rem"}  />
                      <AiFillMessage size={"1.5rem"} className='text-primary'/>
                      <IoBandageSharp size={"1.5rem"}/>
                      <BsGraphUp size={"1.5rem"}/>
                      <FaBullhorn size={"1.5rem"}/>
                      <FaAddressBook size={"1.5rem"}/>
                      <MdFormatListBulleted size={"1.5rem"}/>
                      <FaImage size={"1.5rem"}/>
                      <FcTodoList size={"1.5rem"}/>
                      <IoIosSettings size={"1.5rem"}/>
                      </div>

               
              </div>
          </div>
      </div>
    </div>
  )
}

export default HomePage
