import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = {
    id: string;
    roomId: string;
    name: string;
    available: boolean; 
};

type UsersType = UserType[];
export const userInitState:UserType={
    id: "",
    roomId: "",
    name: "",
    available: true,
}
export const initialState: UsersType = [
    
];

const usersSlice = createSlice({
    name: "usersReducer",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserType>) => {
            const userI = state.find((user) => user.id === action.payload.id);
            if (!userI) {
                console.log("[DEBUG-user-added]");
                state.push(action.payload);
            } else {
                console.log("This User is Already Added", action.payload);
            }
        },
        setName: (state, action: PayloadAction<{ id: string; name: string }>) => {
            const idx = state.findIndex((user) => user.id === action.payload.id);
            if (idx !== -1) {
                state[idx].name = action.payload.name;
                console.log("Name has been updated");
            }
        },
        removeUser: (state, action: PayloadAction<{ name: string }>) => {
            console.log("[DEBUG-DELETE] I am Deleting The User");
            return state.filter((user) => user.name !== action.payload.name);
        },
        updateUser: (state, action: PayloadAction<UserType>) => {
            const uIndex = state.findIndex((user) => user.id === action.payload.id);
            if (uIndex !== -1) {
                console.log(":user:will:be:updated");
                state[uIndex] = { ...state[uIndex], ...action.payload };
            }
        },
        toggleAvailability: (state, action: PayloadAction<{ id: string }>) => {
            const uIndex = state.findIndex((user) => user.id === action.payload.id);
            if (uIndex !== -1) {
                state[uIndex].available = !state[uIndex].available;
            }
        },
        clearAllUsers: () => {
            return [];
        },
    },
});

export type { UserType, UsersType };
export const {
    addUser,
    setName,
    removeUser,
    updateUser,
    toggleAvailability,
    clearAllUsers,
} = usersSlice.actions;

export default {
    usersReducer: usersSlice.reducer,
};
