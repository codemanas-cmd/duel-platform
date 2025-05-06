import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInitState, UserType } from "./usersReducer";


const myState:UserType = {...userInitState}

const myStateSlice = createSlice({
name: "usersReducer",

initialState: myState,
reducers: {
    updateMyState: (state, action) => {
        console.log('i am payload',state,action)
        //state = {...action.payload}
        return {...state ,...action.payload}
    },

        
    setId: (state, action: PayloadAction<string>) => {
        state.id = action.payload
    },
},
});

export const { updateMyState,setId } = myStateSlice.actions;

export default {myStateReducer : myStateSlice.reducer } 