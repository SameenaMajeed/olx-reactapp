import React, { useState, useContext, useRef, useEffect } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailBlur = () => {
    if (!email.includes('@') && email !== '') {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
      if (email && passwordRef.current) {
        passwordRef.current.focus();
      }
    }
  };

  const handlePswdBlur = () => {
    if (password.length < 6) {
      setPasswordError('Minimum length of password is 6');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === '') {
      setEmailError('Field is empty');
      return;
    }

    if (password === '') {
      setPasswordError('Field is empty');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Minimum length of password is 6');
      return;
    }

    try {
      const auth = getAuth(firebase);
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged In');
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="loginParentDiv">
      <NavLink to="/">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
      </NavLink>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          ref={emailRef}
          onBlur={handleEmailBlur}
        />
        {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          ref={passwordRef}
          onBlur={handlePswdBlur}
        />
        {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/signup">
        Signup
      </NavLink>
    </div>
  );
}

export default Login;
