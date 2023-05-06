import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




var productInitialState = []


  const productReducer = createSlice({
    name: "user",
    initialState: productInitialState,
    reducers: {
        productAdd:(state,action)=> {
                console.log(action.payload)
                state = action.payload
                return action.payload
          }
    },
  });


export const { productAdd } = productReducer.actions
export default productReducer.reducer

