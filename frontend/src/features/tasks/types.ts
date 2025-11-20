export interface Comment{
  id:number,
  text:string,
  author:string,
  createdAt:string
}




export interface Task {
  id: number;
  projectId: number;
  contractorId: number;
  title: string;
  status: 'pending' | 'in progress' | 'completed';
  comments:Comment[]
}

export type CreateTaskRequest = Omit<Task, 'id'>;
export type UpdateTaskRequest = Partial<Omit<Task, 'id'>>;

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}