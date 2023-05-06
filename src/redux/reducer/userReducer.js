import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




var userInitialState = []


  const userReducer = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        userDataList:(state,action)=> {
                console.log(action.payload)
                state = action.payload
                return action.payload
          }
    },
  });


export const { userDataList } = userReducer.actions
export default userReducer.reducer

