import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bannerData: [],
    imageUrl: ''
}

export const movieAppSlice = createSlice({
    name: 'movieapp',
    initialState,
    reducers: {
        setBannerData: (state, action) => {
            state.bannerData = action.payload
        },
        setImageUrl : (state, action) => {
            state.imageUrl = action.payload
        }
    }
})

export const {setBannerData, setImageUrl} = movieAppSlice.actions

export default movieAppSlice.reducer