import React, { useCallback, useContext, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import {  useAppSelector } from "../store/store";
import useSocket from "../hooks/useSocket";
import { addUser, removeUser } from "../reducers/usersReducer";


const SocketWrapperContext = React.createContext("socketWrapper")

export function useSocketWrapper() {
  return useContext(SocketWrapperContext)
}
export default function SocketWrapper({ children }) {
    const dispatch=useDispatch();
    const [users,myState]=useAppSelector((state)=>[state.usersReducer,state.myStateReducer]);
    const socketUrl="http://localhost:5000";//our backend url
    const opt=useMemo(
      ()=>({
        reconnection: false,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      }),
      []
    )
    const socketConnectedFirstTime=useCallback(()=>{
      const roomId = myState?.roomId || "default-room"
      const username = myState.name
      console.log("username", username)
      if (username) {
        socket1_emitEvent("join-room", { roomId, username })
      }
    },[myState?.roomId, myState.name])

    const [isSocket1_Connected, socket1_emitEvent, socket1_onEvent, socket1_offEvent] = useSocket(
      socketUrl,
      opt,
      socketConnectedFirstTime,
    )
    const handleAllUsers = useCallback(
      (existingUsernames) => {
        console.log("received all users: " , existingUsernames);
        // existingUsernames.forEach((peerUsername) => {
          const data = {
            receivers: existingUsernames,
            userData: {
              ...myState,
              id: myState.id,
              name:myState.name,
              count: 1,
            },
          }
          socket1_emitEvent("connected-user-data", data)
        // })
      },
      [myState, socket1_emitEvent],
    )//ye hai saarey userke liye
  
    const handleUserConnected = useCallback(
      (newUserId) => {
        const data = {
          toPeer: newUserId,
          userData: { ...myState, id: myState.id },
        }
        socket1_emitEvent("connected-user-data", data)
      },
      [myState, socket1_emitEvent],
    )//ye hai naye user ke liete
  
    const handleReceiveData = useCallback(
      ({ userData }) => {
        console.log("received userData:", userData)
        dispatch(addUser(userData))
      },
      [dispatch],
    )//ye hai jab naya user join kiya to jo dat recicbe hua 
  
    const handleUserDisconnected = useCallback(
      (username) => {
        dispatch(removeUser({ name:username }))
      },
      [dispatch],
    )//jab koi chor diya usko hatane ka 

    useEffect(()=>{
      console.log("[Debugg ] settings up event listeners");
      socket1_onEvent("all-users", handleAllUsers)
      socket1_onEvent("user-connected", handleUserConnected)
      socket1_onEvent("receive-connected-user-data", handleReceiveData)
      socket1_onEvent("user-disconnected", handleUserDisconnected)
  
      socketConnectedFirstTime()
      return () => {
        console.log("Cleaning up socket event listeners")
        socket1_offEvent("all-users", handleAllUsers)
        socket1_offEvent("user-connected", handleUserConnected)
        socket1_offEvent("receive-connected-user-data", handleReceiveData)
        socket1_offEvent("user-disconnected", handleUserDisconnected)
      }
    }, [
      socket1_onEvent,
      socket1_offEvent,
      handleAllUsers,
      handleUserConnected,
      handleReceiveData,
      handleUserDisconnected,
      socketConnectedFirstTime,
    ])
    useEffect(() => {
      console.log("Socket connection status:", isSocket1_Connected)
    }, [isSocket1_Connected])

    const value:string = "";

    return <SocketWrapperContext.Provider value={value}>
        {children}
    </SocketWrapperContext.Provider>
}