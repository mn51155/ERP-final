// src/features/auth/LoginPage.tsx

import {  useEffect, useState} from 'react'
import type { FormEvent} from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { login, logout } from '@/features/auth/authSlice'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { loginSchema } from '@/schemas/loginSchema'


const LoginPage = () => {
  const dispatch = useAppDispatch()
  const {  loading} = useAppSelector(state => state.auth)
   const navigate=useNavigate()
    const [validationErrors,setValidationErrors]=useState<{[key:string]:string}>({})

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

useEffect(()=>{
  dispatch(logout())
},[dispatch])




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
setValidationErrors({})
try{
         await loginSchema.validate(formData,{abortEarly:false})
         await  dispatch(login(formData)).unwrap()

       Swal.fire({
       icon: 'success',
       text:'seccessfully Logged'
              
            }).then(() => {
              
              
              navigate('/') 
            })
}catch(err:any){
   if (err.name === 'ValidationError') {
      const formErrors: { [key: string]: string } = {}
  
      err.inner.forEach((validationErr: yup.ValidationError) => {
        const key = validationErr.path || 'form' 
        formErrors[key] = validationErr.message
      })
   
      setValidationErrors(formErrors)
      console.log(formErrors)
  
    } else{
      Swal.fire({
        icon:'error',
        text:err
      }).then(()=>{
        setFormData({
      email: '',
      password: '',
      
    })
      })
    }




}
   
 }


 

  

  return (
<>
  <div className="flex justify-center items-center min-h-screen bg-gray-100 w-screen ">
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">


                     {validationErrors.email && <p className='text-red-500 text-sm'>{validationErrors.email}</p>}

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          
        />



          {validationErrors.password && <p className='text-red-500 text-sm'>{validationErrors.password}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          
        />
       
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-800 text-black-500  py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className='text-center'><Link to={'/register'}>register</Link></p>
    </div>
    </div>
</>
   
  )
}

export default LoginPage