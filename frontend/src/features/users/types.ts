export interface User {
  id: number
  username: string
  email: string
  role:'admin'|'project_manager'|'contractor'|'employee'|'client'|'user'
  
}

export interface UsersState{
    users:User[],
    loading:boolean,
    error:string | null
}