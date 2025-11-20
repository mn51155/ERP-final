export interface Project {
  id: number;
  title: string;
  description: string;
  managerId:number
  startDate: string;  // یا Date اگر توی پروژه‌ات تبدیل می‌کنی
  endDate: string;
  status: 'planning' | 'in progress' | 'completed'; // بر اساس داده‌هات
}


export type CreateProjectRequest = Omit<Project, 'id'>
export type UpdateProjectRequest = Partial<Omit<Project, 'id'>>


export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}