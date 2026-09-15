import {useState} from 'react'
import {Link, Navigate,useNavigate} from 'react-router'
import './index.css'
import {apiFetch,getAccessToken} from '../../api'

const getErrorMessage = data => {
  if (data.detail !== undefined) {
    return data.detail
  }
  const firstField = Object.keys(data)[0]
  if (firstField === undefined) {
    return 'Registration failed. Please try again.'
  }
  const value = data[firstField][0]
  return `${firstField}: ${value}`
}

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userType, setUserType] = useState('customer')

  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  //Add useNavigate hook
   const navigate = useNavigate()



  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangeEmail = event => {
    setEmail(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onChangeConfirmPassword = event => {
    setConfirmPassword(event.target.value)
  }

  const onChangeUserType = event => {
    setUserType(event.target.value)
  }


     const onSubmitSuccess = () => {
  navigate('/login')
}
const onSubmitFailure = message => {
  setShowSubmitError(true)
  setErrorMsg(message)
}


  //Update the submitForm 
const submitForm = async (event) => {
 event.preventDefault()
  if (password !== confirmPassword) {
    onSubmitFailure('Passwords do not match')
    return
  }

  const response = await apiFetch('/api/users/register/', {
    method: 'POST',
    body: JSON.stringify({username, email, password, user_type: userType}),
  })
    const data = await response.json()
     if (response.ok === true) {
 onSubmitSuccess()
 } else {
 onSubmitFailure(getErrorMessage(data))  
 }



 
}

  // Already logged in? There is nothing to register.
  if (getAccessToken() !== undefined) {
    return <Navigate to="/" />
  }

  return (
    <div className="register-form-container">
      <img
        src="https://s3.ap-south-1.amazonaws.com/new-assets.ccbp.in/frontend/loading-data/niat_react_js/niat_coding_questions/nxt-trendz-logo.png"
        className="register-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="register-img"
        alt="website register"
      />
      <form className="register-form" onSubmit={submitForm}>
        <img
          src="https://s3.ap-south-1.amazonaws.com/new-assets.ccbp.in/frontend/loading-data/niat_react_js/niat_coding_questions/nxt-trendz-logo.png"
          className="register-website-logo-desktop-img"
          alt="website logo"
        />

        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="register-input-field"
            value={username}
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="email">
            EMAIL
          </label>
          <input
            type="text"
            id="email"
            className="register-input-field"
            value={email}
            onChange={onChangeEmail}
            placeholder="Email"
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="register-input-field"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="confirmPassword">
            CONFIRM PASSWORD
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="register-input-field"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder="Confirm Password"
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="userType">
            I AM A
          </label>
          <select
            id="userType"
            className="register-input-field"
            value={userType}
            onChange={onChangeUserType}
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <button type="submit" className="register-button">
          Create Account
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}

        <p className="form-footer-text">
          Already have an account?{' '}
          <Link className="form-footer-link" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterForm
