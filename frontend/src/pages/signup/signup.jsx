import { useState } from 'react';
import './__test__/signup.css';
import axios from 'axios';
import { Link } from "react-router-dom";

function SignupForm() {
    const initialFormData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: ''
      };
    const[formData, setFormData]=useState(initialFormData);
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validateForm()) {
          setFormError('');
    
          if (formData.password === document.getElementById('confirm-password').value) {
            // Passwords match, proceed with form submission
            axios
              .post('http://localhost:3000/signup', formData)
              .then((response) => {
                // Handle successful response
                setFormError('');
                setPasswordError('');
                setFormData(initialFormData);
                console.log(response.data);
              })
              .catch((error) => {
                // Handle error
                console.error(error);
              });
            console.log(formData)
          } else {
            // Passwords do not match
            setPasswordError('Passwords do not match');
          }
        } else {
          setFormError('Please fill in all the fields.');
        }
      };
    
    const validateForm = () => {
        return (
          formData.name.trim() !== '' &&
          formData.email.trim() !== '' &&
          formData.password.trim() !== '' &&
          formData.gender.trim() !== ''
        );
      };
    return (
        <div className="form">
                <form action="/signup" method='post' onSubmit={handleSubmit}>
                    <p className="mini-heading">lets get started</p>
                    <h1 className="heading">Create an Account</h1>
                    <label htmlFor="name">Name</label><br/>
                    <input 
                        className="full-field" 
                        type="text" 
                        id="name" 
                        name='name' 
                        placeholder='enter your name'
                        value={formData.name} onChange={handleInputChange}
                    />
                    <label htmlFor="email">Email Id</label><br/>
                    <input 
                        className="full-field" 
                        type="email" 
                        id="email" 
                        name='email' 
                        placeholder='enter your email'
                        value={formData.email} onChange={handleInputChange}
                        />
                    <div className="double-field">
                        <div className="left-field">
                            <label htmlFor="password">Password</label><br/>
                            <input 
                                className="full-field" 
                                type="password" 
                                id="password" 
                                name='password' 
                                placeholder='password'
                                value={formData.password} onChange={handleInputChange}
                            />
                        </div>
                        <div className="right-field">
                            <label htmlFor="confirm-password">Confirm Password</label><br/>
                            <input 
                                className="full-field" 
                                type="password" 
                                id="confirm-password" 
                                name='confirmPassword' 
                                placeholder='confirm password'
                                value={formData.confirmPassword} onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {passwordError && <p className="form-error-msg" style={{ color: 'red' }}>{passwordError}</p>}
                    <div className="gender-form">
                    <label htmlFor="">Gender: </label>
                        <div className="option">
                            <input 
                                type="radio" 
                                id="male" 
                                name="gender" 
                                value='male'
                                checked={formData.gender === 'male'}
                                onChange={handleInputChange}
                            /> Male
                        </div>
                        <div className="option">
                            <input 
                                type="radio" 
                                id="female" 
                                name="gender" 
                                value='female'
                                checked={formData.gender === 'female'}
                                onChange={handleInputChange}
                            /> Female
                        </div>
                        <div className="option">
                            <input 
                                type="radio" 
                                id="others" 
                                name="gender" 
                                value='other'
                                checked={formData.gender === 'other'}
                                onChange={handleInputChange}
                            /> Others
                        </div>
                    </div>
                    {formError && <p className="form-error-msg">{formError}</p>}
                    <button type='submit' className='btn btn-lime-blue btn-full'>Sign up</button>
                </form>
                <p className="alternate-option">
                    Already have an account? <Link to={`/auth/login`}>Login</Link>
                </p>
            </div>
    )
}

export default SignupForm