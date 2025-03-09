import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Socket, } from "socket.io-client";
import { SignupDataType,User,useAuthStoreType } from '@/types';
import io from 'socket.io-client';


const BASE_URL =  "https://chat-app-backend-0kzn.onrender.com"


export const useAuthStore = create<useAuthStoreType>((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            // console.log(response)
            set({ authUser: response.data })
            get().connectSocket();

        } catch (error) {
            console.log("Error in checkAuth", error)
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            toast.success("Signup successful");
            set({ authUser: res.data })
        } catch (error:any) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }

    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            get().disconnectSocket()
            set({ authUser: null })
            toast.success("Logged out successfully")
        } catch (error:any) {
            toast.error(error.response.data.message)
        }
    },

    login: async (data) => {
        console.log(data)
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            toast.success("Login successful");
            set({ authUser: res.data })
            get().connectSocket();
        } catch (error:any) {
            // toast.error(error.response.data.message)
            console.log(error)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data })
            toast.success("Profile updated successfully");

        } catch (error:any) {
            console.log("error in updating profile", error);
            toast.error(error.response.data.message)

        } finally {
            set({ isUpdatingProfile: false })
        }
    },
    connectSocket: () => {
        const { authUser } = get();

        if (!authUser || get().socket?.connected)
            return

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }

            
        }
        );
        socket.connect()
        set({ socket: socket })

        socket.on("getOnlineUsers",(userIds:string[])=>{
            set({onlineUsers:userIds})
        })  // getOnlineUsers need to be same in emit
    },

    disconnectSocket: () => {
        if (get().socket?.connected)
            get().socket?.disconnect()
        console.log("dis")
    }
}))