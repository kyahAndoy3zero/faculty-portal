import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {ModalContext} from '../../Modal/ModalContext/ModalContext'
import { createRoom, reset } from '../../feature/room/roomSlice'

const CreateRoom = () => {
  
    let {handleModal} = React.useContext(ModalContext)
    
    const [room, setRoomData] = useState({
      course: '',
      year: '',
      section:''
    })

    const dispatch = useDispatch()

    const {course, year, section} = room

    const onChange = (e) => {
      setRoomData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

    const onSubmit = (e) => {
      e.preventDefault()
      const roomData = {course, year, section}
      
      dispatch(createRoom(roomData))
      handleModal()
  }


    
  return (
    <>
            <div className="flex items-start justify-between">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Empty Room</h3>
                <button type="button" onClick={() => handleModal()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                </button>
            </div>
            
            <form className="mt-5 space-y-6" onSubmit={onSubmit}>
                
                <div>
                <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course</label>
                <input type="text" name="course" id="course" value={course} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required=""/>
                </div>
                <div>
                <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Year</label>
                <input type="number" name="year" id="year" value={year} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required=""/>
                </div> 
                <div>
                <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Section</label>
                <input type="text" name="section" id="section" value={section} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required=""/>
                </div>

                <div className='space-y-3'>
                <button type="submit" className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                <button type="button" onClick={() => handleModal()}  className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Close</button>
                </div>
            </form>
    </>
  )
}
 
export default CreateRoom