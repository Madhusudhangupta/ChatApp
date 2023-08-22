import { useNavigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'
import '../css/IndexPage.css'

function IndexPage() {
    const navigate = useNavigate()

    const handleNewRoom = function() {
        navigate('/newroom')
    }

    const handleExistRoom = function() {
        navigate('/exroom')
    }

  return (
    <div className="index__page">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="index__contents">
            {/* <Logo /> */}
            <div className="index__banner_text">
                <h1>Now chat anonymously with <br /> anyone</h1>
                <h3>Click <strong>New Chat Room</strong> to get a room code you can send to people <br />you want to chat with</h3>

                <div className="index__btns">
                    <button className="btn__new__chat nowrap" onClick={handleNewRoom}>
                        New Chat Room
                    </button>

                    <button className="btn__old_chat nowrap" onClick={handleExistRoom}>
                        Join Chat Room
                    </button>
                </div>
            </div>

            <div className="index__banner__img">
                <img src="" alt="Chat Banner" />
            </div>
        </div>

        <div>
            <Footer />
        </div>
    </div>
  )
}

export default IndexPage