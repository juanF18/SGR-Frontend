import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmptySessionState, SessionState } from '@/models'; // Asegúrate de que el tipo esté bien definido

// Estado inicial, que puede venir de localStorage
const sessionSlice = createSlice({
  name: 'session',
  initialState: EmptySessionState,
  reducers: {
    login: (state, action: PayloadAction<SessionState>) => {
      const { email, firstName, lastName, role, accessToken, refreshToken, entityName } =
        action.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.role = role;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.entityName = entityName;
    },
    logout: (state) => {
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.role = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.entityName = '';
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;

      // Actualizamos el localStorage con el nuevo accessToken
      const currentSession = { ...state, accessToken: action.payload };
      if (typeof window !== 'undefined') {
        localStorage.setItem('session', JSON.stringify(currentSession));
      }
    },
  },
});

export const { login, logout, updateAccessToken } = sessionSlice.actions;
export default sessionSlice.reducer;
