import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { validateExistRoom } from '../helper/ValidateForm'
import { Toaster, toast } from 'react-hot-toast'
import { nanoid } from 'nanoid'
import '../css/ExistRoomPage.css'

function ExistRoomPage() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      userName: "",
      roomCode: "",
    },
    validate: validateExistRoom,
    onSubmit: async (values) => {
      try {
        const userId = nanoid()
        navigate(`/chat/${values.roomCode}`, {
          state: {
            IS_NEW_ROOM: false,
            USER_NAME: values.userName,
            USER_ID: userId,
            ROOM_CODE: values.roomCode,
          },
          replace: true,
        })
      } catch (error) {
        toast.error(error.message)
      }
    }
  })
  return (
    <div className='exroom__page'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      {/* <Logo /> */}

      <div className="exroom_wrapper">
        <div className="shape__two"></div>
        <div className="exroom__contents">
          <h1 className="exroom__heading">Enter Existing Chat Room</h1>

          <form className="exroom__form" onSubmit={formik.handleSubmit}>
            <input 
            type="text" 
            placeholder='Username'
            id='userName'
            name='userName'
            required
            autoFocus
            maxLength={20}
            onChange={formik.handleChange}
            value={formik.values.userName}
          />
          {formik.errors.userName && (
            <p className="input__error">{formik.errors.userName}</p>
          )}
          <button className="join__room__btn" type='submit'>Join Room</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ExistRoomPage