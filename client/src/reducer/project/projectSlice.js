import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    currentProject: null
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addProjectStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        addProjectSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.projects = action.payload;
        },
        addProjectFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchProjectsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProjectsSuccess: (state, action) => {
            state.loading = false;
            state.projects = action.payload;
        },
        fetchProjectsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProjectStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        updateProjectSuccess: (state, action) => {
            state.loading = false;
            state.success = 'Project updated successfully!';
            state.projects = state.projects.map(project => 
                project.id === action.payload.id ? action.payload : project
            );
        },
        updateProjectFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteProjectStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        deleteProjectSuccess: (state, action) => {
            state.loading = false;
            state.success = 'Project deleted successfully!';
            state.projects = state.projects.filter(project => project.id !== action.payload);
        },
        deleteProjectFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearProjectState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = null;
        }
    }
});

export const {
    addProjectStart,
    addProjectSuccess,
    addProjectFailure,
    fetchProjectsStart,
    fetchProjectsSuccess,
    fetchProjectsFailure,
    updateProjectStart,
    updateProjectSuccess,
    updateProjectFailure,
    deleteProjectStart,
    deleteProjectSuccess,
    deleteProjectFailure,
    clearProjectState
} = projectSlice.actions;

export default projectSlice.reducer; 