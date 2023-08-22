import "../css/ProgressBar.css"
import PuffLoader from "react-spinners/PuffLoader"

function ProgressBar() {
  return (
    <div className="progress__bar__component">
      <PuffLoader
        color="#9ad068"
        size={30}
        loading={true}
        aria-label="Sending File"
      />
      <p>Sending File . . .</p>
    </div>
  )
}

export default ProgressBar