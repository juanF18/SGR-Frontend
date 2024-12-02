// redux/sessionSlice.ts
import { SessionState } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definir los tipos para los datos de la sesión
const initialState: SessionState = {
  email: null,
  firstName: null,
  lastName: null,
  role: null,
  accessToken: null,
  refreshToken: null,
};

// Crear un slice con las acciones correspondientes
const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    // Acción para iniciar sesión
    login: (state, action: PayloadAction<SessionState>) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    // Acción para cerrar sesión
    logout: (state) => {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.role = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    // Acción para actualizar el token de acceso
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

// Exportar las acciones para usarlas en los componentes
export const { login, logout, updateAccessToken } = sessionSlice.actions;

export default sessionSlice.reducer;
