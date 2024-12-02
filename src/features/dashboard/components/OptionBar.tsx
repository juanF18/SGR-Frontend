import React, { useState } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface Project {
  id: string;
  name: string;
}

interface Props {
  projects: Project[];
  onCreateProject: () => void;
  onSearchProject: (projectId: string) => void;
}

export function OptionBar({ projects, onCreateProject, onSearchProject }: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchChange = (_: any, value: Project | null) => {
    setSelectedProject(value);
    if (value) {
      onSearchProject(value.id); // Llamada para filtrar o hacer algo con el proyecto seleccionado
    }
  };

  return (
    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
      {/* Columna para el Autocomplete */}
      <Grid size={{ xs: 12, sm: 3 }}>
        <Autocomplete
          value={selectedProject}
          onChange={handleSearchChange}
          options={projects}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar proyecto"
              fullWidth
              sx={{ '& .MuiInputBase-root': { height: '50px' } }} // Ajusta la altura aquí
            />
          )}
        />
      </Grid>

      {/* Columna para el botón Crear Proyecto */}
      <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={onCreateProject}>
          Crear Proyecto
        </Button>
      </Grid>
    </Grid>
  );
}
