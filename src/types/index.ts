import { Socket } from "socket.io-client";

export type SignupDataType = {
    fullName:string,
    email:string,
    password:string
}

export type LoginDataType = {
    email:string,
    password:string
}
export type User={
    _id:string,
    fullName:string,
    email:string,
    profilePic:string,
    password?:string,
    createdAt?:string,
    updatedAt?:string
}

export type useAuthStoreType = {
    authUser: User |null
    isSigningUp: boolean,
    isLoggingIn: boolean,
    isUpdatingProfile: boolean,
    isCheckingAuth: boolean,
    onlineUsers: string[],
    socket: typeof Socket| null,
    checkAuth:()=>void,
    signup:(data:SignupDataType)=> Promise<void>,
    logout:()=> Promise<void>,
    login:(data:LoginDataType)=> Promise<void>,
    updateProfile:(data:UpdateProfileDataType)=>Promise<void>,
    connectSocket:()=>void,
    disconnectSocket:()=>void
  };

  export type UpdateProfileDataType={
    profilePic:string | ArrayBuffer | null
  }


  
  export type MessageType={
      _id: string;
      senderId: string;
      receiverId: string;
      text?: string;
      image?:string | ArrayBuffer | null;
      createdAt: string; 
      updatedAt: string; 
  }

  type MessageData={
    text?: string;
    image?:string | ArrayBuffer | null;
  }
  
  export type ChatStoreType={
      messages:MessageType[],
      users:User[] 
      selectedUser:User | null,
      isUsersLoading:boolean,
      isMessagesLoading:boolean,
      getUsers:()=> Promise<void>,
      getMessages:(userId:string)=> Promise<void>,
      sendMessage:(messageData:MessageData)=> Promise<void>,
      subsribeToMessages:()=>void,
      unsubscribeFromMessages:()=>void,
      setSelectedUser:(selectedUser:User|null)=>void
  }
  