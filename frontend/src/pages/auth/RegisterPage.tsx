import React, {  useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { register } from '@/features/auth/authSlice'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { registerSchema } from '@/schemas/registerSchema'

const RegisterPage = () => {


  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.auth)
  const navigate=useNavigate()
  const [validationErrors,setValidationErrors]=useState<{[key:string]:string}>({})
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username:''
  })





  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationErrors({})

    const completeData={
      ...formData,
      role:'user'
    }

    try{

          await registerSchema.validate(formData,{abortEarly:false})

          const result=await dispatch(register(completeData)).unwrap()
          console.log(result)


          Swal.fire({
            icon: 'success',
           title: `wellcome `,
           text:'seccessfully registered'
        
      }).then(() => {
        navigate('/login') 
      })
    }catch (err: any) {
  if (err.name === 'ValidationError') {
    const formErrors: { [key: string]: string } = {}

    err.inner.forEach((validationErr: yup.ValidationError) => {
      const key = validationErr.path || 'form' // اگر path نداشت، کلید 'form' بگذار
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
    username:''
  })
    })
  }


}


    
  }


 


  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-100 w-screen ">

   
   
                  <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">register</h2>

               {validationErrors.username && <p className='text-red-500 text-sm'>{validationErrors.username}</p>}

        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          
        />


                {validationErrors.email && <p className='text-red-500 text-sm'>{validationErrors.email}</p>}

        <input
          
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          
        />


                {validationErrors.password && <p className='text-red-500 text-sm'>{validationErrors.password}</p>}

        <input
          type='password'
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded"
          
        />


        <button
          type="submit"
          className="w-full bg-blue-500 text-black py-2 rounded hover:bg-blue-700"
        >
           {loading ? '...loading' : 'register'}
        </button>
      </form>

    
    
    </div>
  )
}

export default RegisterPage





