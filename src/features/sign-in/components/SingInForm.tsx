import React from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import { SingInRequest } from "@/features/sign-in/models";

export function SingInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingInRequest>();

  const onSubmit = (data: SingInRequest) => {
    console.log("Datos enviados:", data);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: "black" }}
      >
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Campo de Email */}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "El correo no es válido",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Campo de Contraseña */}
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Link href="#" underline="hover" sx={{ display: "block", my: 1 }}>
          ¿Olvidaste tu contraseña?
        </Link>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          INICIAR SESIÓN
        </Button>
      </Box>
    </Box>
  );
}
