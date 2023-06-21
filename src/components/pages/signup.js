import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { signup } from '../../services/index';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
    } else {
      setValidationError('');
      setSignupError('');

      try {
        const userData = {
          email,
          username,
          password,
        };

        const response = await signup(userData);
        sessionStorage.setItem('user_name', response.user.username);
        sessionStorage.setItem('user_id', response.user._id);
        navigate('/dashboard');

        // Clear form fields after successful signup
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        console.error(error); // Handle error
        setSignupError(error.message);
      }
    }
  };

  return (
    <div style={{ backgroundColor: 'white', width: '500px', margin: '0 auto', padding: '40px', borderRadius: '5px' }}>
      <h2>Create an Account</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
        {signupError && <p style={{ color: 'red' }}>{signupError}</p>}

        <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
          Sign Up
        </Button>
      </Form>
      <p style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/auth/sign-in">Sign In here</Link>.
      </p>
    </div>
  );
}

export default SignUp;
