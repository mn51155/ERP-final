export interface Contractor {
  id: number;
  userId:number;
  name: string;
  email: string;
  phone: string;
}

export interface CreateContractorRequest  {
  userId:number,
  name:string,
  email:string,
  phone:string
}

export interface ContractorFormData{
  name:string,
  email:string,
  phone:string

}
export type UpdateContractorRequest = Partial<Omit<Contractor, 'id'>>;

export interface ContractorState {
  contractors: Contractor[];
  loading: boolean;
  error: string | null;
}