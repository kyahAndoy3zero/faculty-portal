import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { registerUser, reset } from '../feature/auth/authSlice'


const Register = () => {


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
    password2: ''
})

  const { name, email, password, password2} = formData
  
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
      if(isError){
      console.log('Error')
      }

      if(isSuccess || user){
          navigate('/login')
      }

      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])


    const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
      }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(!email || !name || !password){
       console.log("Provide all data")
    }
    if (password !== password2) {
        console.log("Password does not match")
      } else {
        const userData = {
          name,
          email,
          password
        }
        dispatch(registerUser(userData))
      }
    }

    if(isLoading){
      return <div>Fetching data</div>
    }


  return (
    <>
        <div className='w-5/6 mx-auto mt-20 md:w-2/6'>
              <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-md sm:p-8 lg:p-10 dark:bg-gray-800 dark:border-gray-700">
                    
                    <form onSubmit={onSubmit} className="space-y-6 ">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Register</h3>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Ex. Juan Dela Cruz" required=""/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="email@company.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" required=""/>
                    </div>

                    <div>
                        <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm Password</label>
                        <input type="password" name="password2" id="password2" value={password2} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" required=""/>
                    </div>
					<button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
							Have an account? <Link to='/login' className="text-blue-700 dark:text-blue-500">Sign In</Link>
					</div>
                    </form>
                    
                </div>
                </div>
    </>
  )
}

export default Register