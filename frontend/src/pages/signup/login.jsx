import './__test__/signup.css';
import axios from 'axios';
import { useState } from 'react';
import { Link } from "react-router-dom";
import googleIcon from './images/search.png'

function LoginForm() {
    const initialFormData = {
        email: '',
        password: ''
      };
    const[formData, setFormData]=useState(initialFormData);
    const [formError, setFormError] = useState('');
    const [submitError, setSubmitError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validateForm()) {
          setFormError('');
          setSubmitError('');
          console.log(formData)
          axios
              .post('http://localhost:3000/login', formData)
              .then((response) => {
                // Handle successful response
                setFormData(initialFormData);
                console.log(response.data);
              })
              .catch((error) => {
                // Handle error
                console.error(error);
                setSubmitError(error.response.data.message);
              });
        } else {
          setFormError('Please fill in all the fields.');
        }
      };
    
    const validateForm = () => {
        return (
          formData.email.trim() !== '' &&
          formData.password.trim() !== ''
        );
      };
    return (
        <div className="form">
                <form action="/signup" method='post' onSubmit={handleSubmit}>
                    <p className="mini-heading">Hello there</p>
                    <h1 className="heading">Welcome Back!</h1>
                    <label htmlFor="email">Email Id</label><br/>
                    <input 
                        className="full-field" 
                        type="email" 
                        id="email" 
                        name='email' 
                        placeholder='enter your email'
                        value={formData.email} onChange={handleInputChange}
                    />
                    <label htmlFor="password">Password</label><br/>
                    <input 
                        className="full-field" 
                        type="password" 
                        id="password" 
                        name='password' 
                        placeholder='password'
                        value={formData.password} onChange={handleInputChange}
                    />
                    <div className="additional-sec">
                        <Link to={`/auth/forget-password`}>Forget Password?</Link>
                    </div>
                    {formError && <p className="form-error-msg">{formError}</p> ||
                    submitError && <p className="server-error-msg">{submitError}</p>}
                    <button type='submit' className='btn btn-orange btn-full'>Login</button>
                    <button className='btn btn-light btn-full' style={{marginTop:"1rem", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <img src={googleIcon} alt="google logo png" style={{width:"25px", aspectRatio:"1/1", marginRight:"1rem"}}/>
                        Sign in with Google</button>
                </form>
                <p className="alternate-option">
                    Dont Have any account? <Link to={`/auth/signup`}>SignUp</Link>
                </p>
            </div>
    )
}

export default LoginForm