import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { validateNewRoom } from '../helper/ValidateForm'
import { nanoid } from 'nanoid'
import { Toaster, toast } from 'react-hot-toast'

function NewRoomPage() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      userName: ""
    },
    validate: validateNewRoom,
    onSubmit: async (values) => {
      try {
        const roomCode = nanoid()
        const userId = nanoid()
        navigate(`/chat/${roomCode}`, {
          state: {
            IS_NEW_ROOM: true,
            USER_NAME: values.userName,
            USER_ID: userId,
            ROOM_CODE: roomCode,
          },
          replace: true,
        })

      } catch (error) {
        toast.error(error.message)
      }
    }
  })
  return (
    <div className='newroom__page'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      {/* <logo /> */}

      <div className="newroom__wrapper">
        <div className="shape"></div>
        <div className="newroom_contents">
          <h1 className="newroom__heading">Create New Chat Room</h1>

          <form className="newroom_form" onSubmit={formik.handleSubmit}>
            <input 
              type="text" 
              placeholder='Username'
              id='username'
              name='userName'
              required
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            {formik.errors.userName && (
              <p className="input__errors">{formik.errors.userName}</p>
            )}
            <button className="create_room__btn" type='submit'>Create Room</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewRoomPage