import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    currFreelancer: null,
};

const freelancerSlice = createSlice({
    name: "freelancer",
    initialState,
    reducers: {
        registerFreelancerStart: (state) => {
            state.loading = true;
        },
        registerFreelancerSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currFreelancer = action.payload; 
        },
        registerFreelancerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateFreelancerStart: (state) => {
            state.loading = true;
        },
        updateFreelancerSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currFreelancer = action.payload; 
        },
        updateFreelancerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearFreelancerState: (state) => {
            state.loading = false;
            state.error = null;
            state.currFreelancer = null; 
        },
    },
});

export const {
    registerFreelancerStart,
    registerFreelancerSuccess,
    registerFreelancerFailure,
    updateFreelancerStart,
    updateFreelancerSuccess,
    updateFreelancerFailure,
    clearFreelancerState,
} = freelancerSlice.actions;

export default freelancerSlice.reducer;
