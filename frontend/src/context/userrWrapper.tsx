import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid"
import { useAppSelector } from "../store/store";
import { addUser, removeUser, userInitState } from "../reducers/usersReducer";
import { updateMyState } from "../reducers/myStateReducer";
import rng from "random-username-generator"

const userWrapperContext=React.createContext("userWrapper");
export function useUserWrapper(){
    return useContext(userWrapperContext);
}
export default function UserWrapper({children}){
    const dispatch=useDispatch()
    const [users,myState]=useAppSelector((state)=>[state.usersReducer,state.myStateReducer]);
    const init=useCallback(
        async(id:string, name:string)=>{
            const tempUser={...userInitState};
            tempUser.id=id;
            tempUser.roomId="default-room";
            tempUser.available=true;
            tempUser.name = name;
            //guess the name come from auth
            try {
                console.log("Init of the user");
            } catch (error) {
                console.error("fuck happened here",error);
            }finally{
                dispatch(updateMyState(tempUser));
                dispatch(addUser(tempUser))
            }
        },[dispatch]
    )
    useEffect(()=>{
        const id:string=uuidv4()
        rng.setSeperator("_");
        const name = rng.generate();
        console.log("Init wth id:",id);
        init(id, name);
        return()=>{
            console.log("Cleaning when dismount");
            dispatch(removeUser({name}));
        }
    },[init,dispatch])

    const value = useMemo(() => ({
        users,
        myState
    }), [users, myState]);
    //@ts-ignore
    return <userWrapperContext.Provider value={value}>
        {children}
    </userWrapperContext.Provider>
}