import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { ChatStoreType, MessageType } from "@/types";




export const useChatStore =create<ChatStoreType>((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers:async()=>{
        set({isUsersLoading:true})
        try {
            const res =await axiosInstance.get("/messages/users");
            set({users:res.data})
        } catch (error:any) {
            toast.error(error.response.data.message)            
        } finally{
            set({isUsersLoading:false})
        }
    },
    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res =await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data})
        } catch (error:any) {
            toast.error(error.response.data.message)            
        } finally{
            set({isMessagesLoading:false})
        }
    },

    sendMessage:async(messageData)=>{
        const {selectedUser,messages}=get();
        try {
            const res =await axiosInstance.post(`/messages/send/${selectedUser?._id}`,messageData);
            set({messages:[...messages,res.data]})
            
        } catch (error) {
            console.log("ERROR ",error)
            // toast.error(error.response.data.message)            
        }

    },

    subsribeToMessages:()=>{
        const {selectedUser} = get();
        if(!selectedUser)
            return;

        const socket=useAuthStore.getState().socket

        if(socket){
        socket.on("newMessage",(newMessageData:MessageType)=>{
            const isMesageSentFromSelectedUser=   newMessageData.senderId ===selectedUser._id     

            if(!isMesageSentFromSelectedUser)
                return;
            set({
                messages:[...get().messages,newMessageData]
            })
        })
      }
    },

    unsubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket;
        if(socket)
            socket.off("newMessage");
    },

    setSelectedUser:(selectedUser)=>set({selectedUser})
}))