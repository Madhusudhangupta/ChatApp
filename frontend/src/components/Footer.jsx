import '../css/Footer.css'

function Footer () {
    const handleClick = function () {
        window.open("http://localhost:3000/", "_blank", "noopener")
    }

    return (
        <footer className="footer">
            <div className="footer__content">
                <p>
                    Made with 💗 by {" "}
                    <span onClick={handleClick}>EviL</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer