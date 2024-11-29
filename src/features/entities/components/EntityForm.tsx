import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { EntityRequest } from "../models";
import { useEntityContext } from "../context/Entity.context";

interface Props {
  onSubmit: (data: EntityRequest) => void;
}

export function EntityForm({ onSubmit }: Props) {
  const { selectedEntity } = useEntityContext();
  const { control, handleSubmit, reset } = useForm<EntityRequest>({
    defaultValues: {
      name: "",
      nit: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      ...(selectedEntity ? { id: selectedEntity.id ?? "" } : {}),
    },
  });

  useEffect(() => {
    if (selectedEntity) {
      reset(selectedEntity);
    } else {
      reset({
        name: "",
        nit: "",
        email: "",
        phone: "",
        address: "",
        city: "",
      });
    }
  }, [selectedEntity, reset]);

  const handleFormSubmit = (data: EntityRequest) => {
    data.name = data.name.trim();
    data.nit = data.nit.trim();
    data.email = data.email.trim();
    data.phone = data.phone.trim();
    data.address = data.address.trim();
    data.city = data.city.trim();

    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="entity-form">
      <Grid container spacing={2} p={2}>
        {/* Campo para el nombre de la entidad */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "El nombre es requerido" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Nombre"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>

        {/* Campo para el NIT de la entidad */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="nit"
            control={control}
            rules={{ required: "El NIT es requerido" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="NIT"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>

        {/* Campo para el email de la entidad */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "El email es requerido",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "El email no es válido",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>

        {/* Campo para el teléfono de la entidad */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "El teléfono es requerido" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Teléfono"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>

        {/* Campo para la dirección de la entidad */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="address"
            control={control}
            rules={{ required: "La dirección es requerida" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Dirección"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>

        {/* Campo para la ciudad de la entidad */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="city"
            control={control}
            rules={{ required: "La ciudad es requerida" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Ciudad"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>
      </Grid>
    </form>
  );
}
