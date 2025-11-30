export interface User {
  id: number
  username: string
  email: string
  role:'admin'|'project_manager'|'contractor'|'user'
  
}

export interface UsersState{
    users:User[],
    loading:boolean,
    error:string | null
}