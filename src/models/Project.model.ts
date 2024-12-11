export interface ProjectState {
  projectName: string;
  projectId: string;
}

export const emptyProjectState: ProjectState = {
  projectName: '',
  projectId: '',
};
