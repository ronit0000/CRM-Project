import google from "./icons8-google-48.png";
import microsoft from "./icons8-microsoft-48.png"
const SocialLogin = () => {
    return (
      <div className="social-login">
        <button className="social-button">
          <img src={google} alt="Google" className="social-icon" />
          Google
        </button>
        <button className="social-button">
          <img src={microsoft} alt="Microsoft" className="social-icon" />
          Microsoft
        </button>
      </div>
    )
  }
  
  export default SocialLogin;