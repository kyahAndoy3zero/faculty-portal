import React from 'react'
import Spinner from '../Spinner/Spinner'
import { useSelector } from 'react-redux'



const StudentCards = ({profile}) => {
  
  
  const {isLoading} = useSelector((state) => state.profiles)

  

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
            <div className="w-full px-1 py-1 my-1 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" >
            <div className="flex justify-between p-4 overflow-hidden rounded-lg shadow-sm h-28 ring-gray-200 ring-2 md:p-4">
                  {profile.name}
            </div>
             </div>
 
    </>
  )
}

export default StudentCards