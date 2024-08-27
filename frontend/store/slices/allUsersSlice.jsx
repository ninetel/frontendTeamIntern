import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    allUsers: []
}

const alllUsersSlice = createSlice({
    name: 'alllUsers',
    initialState,
    reducers: {
        setAllUsers  : (state, action) => {
            state.allUsers = action.payload
        }
    }
})

export default alllUsersSlice.reducer
export const  {setAllUsers} = alllUsersSlice.actions