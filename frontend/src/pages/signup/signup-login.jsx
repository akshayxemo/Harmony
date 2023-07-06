import PropTypes from 'prop-types'
import './__test__/Signup-login.css'
import authPagePic from './images/Balloons.png'
import SignupForm from './signup'
import LoginForm from './login'
import ForgetPasswordForm from './forget-password'

SignupLoginPage.propTypes = {
    page: PropTypes.node.isRequired,
};
function renderSwitch(param){
    switch(param){
        case 'login':
            return <LoginForm/>
        case 'signup':
            return <SignupForm/>
        case 'forget-password':
            return <ForgetPasswordForm />
        default:
            return <LoginForm/>
    }
}
function SignupLoginPage(props){
    return(
        <div className="container-lg authentication-container">
            <div className="auth-side form-side">
            {renderSwitch(props.page)}
            </div>
            <div className="auth-side image-side">
                <img src={authPagePic}></img>
            </div>
        </div>
    )
}

export default SignupLoginPage