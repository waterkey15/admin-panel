import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
    userEmail: null,
    userID: null,
    role: null,
    active: 0
};


export const userSlice = createSlice({
    name: "user_check",
    initialState: {value: initialStateValue},
    reducers: {
        SET_USER: (state, action)=>{
            console.log(action.payload);
            state.value = {
                ...state,
                userEmail : action.payload.email,
                userID: action.payload.userID,
                role: action.payload.role,
                active: action.payload.active
            }
        }

    }
});


export const {SET_USER} = userSlice.actions
export default userSlice.reducer