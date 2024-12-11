import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emptyProjectState } from '@/models';

const projectSlice = createSlice({
  name: 'project',
  initialState: emptyProjectState,
  reducers: {
    setProject: (state, action: PayloadAction<{ name: string; id: string }>) => {
      state.projectName = action.payload.name;
      state.projectId = action.payload.id;
    },
    clearProject: (state) => {
      state.projectName = '';
      state.projectId = '';

      // Limpiamos el localStorage si es necesario
      if (typeof window !== 'undefined') {
        localStorage.removeItem('project');
      }
    },
  },
});

export const { setProject, clearProject } = projectSlice.actions;
export default projectSlice.reducer;
