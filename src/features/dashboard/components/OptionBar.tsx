import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearProject, setProject } from '@/redux/projectSlice';

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
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const selectedProjectFromStore = useSelector((state: RootState) => state.project);

  useEffect(() => {
    if (projects.length > 0 && selectedProjectFromStore.projectId === '') {
      const firstProject = projects[0];
      setSelectedProject(firstProject);
      dispatch(
        setProject({
          id: firstProject.id,
          name: firstProject.name,
        })
      );
    } else if (projects.length > 0 && selectedProjectFromStore.projectId !== selectedProject?.id) {
      console.log('entre');

      const projectFromStore = projects.find(
        (project) => project.id === selectedProjectFromStore.projectId
      );
      setSelectedProject(projectFromStore || null);
    }
  }, [dispatch, projects, selectedProjectFromStore, selectedProject?.id]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchChange = (_: any, value: Project | null) => {
    setSelectedProject(value);
    if (value) {
      onSearchProject(value.id);
      dispatch(
        setProject({
          id: value.id,
          name: value.name,
        })
      );
    } else {
      dispatch(clearProject());
    }
  };

  return (
    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
      {/* Columna para el Autocomplete */}
      <Grid size={{ xs: 12, sm: 5 }}>
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
