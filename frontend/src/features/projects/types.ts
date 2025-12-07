export interface Project {
  id: number;
  title: string;
  description: string;
  managerId:number
  startDate: string;  
  endDate: string;
  status: 'planning' | 'in progress' | 'completed';    
}


export type CreateProjectRequest = Omit<Project, 'id'>
export type UpdateProjectRequest = Partial<Omit<Project, 'id'>>


export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}