import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner/Spinner'
import StudentCards from "../components/StudentCard/StudentCards"
import {getProfiles, reset} from '../feature/profile/profileSlice'


const Students = () => {
  
    const {id} = useParams();
    const {profiles, isError, isLoading, message} = useSelector((state) => state.profiles)
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            navigate('/login')
          }
          
          dispatch(getProfiles(id))

          
          return () => {
            dispatch(reset())
          }
    }, [id, user, navigate, message, isError, dispatch])


    if(isLoading){
        return <Spinner/>
    }
    
    return (
        <>

        <div className="container px-4 mx-auto my-12 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {profiles.map((profile) => (
                    <StudentCards key={profile._id} profile={profile}/>
                ))}
            </div>
        </div>
        
        </>
    )
}

export default Students