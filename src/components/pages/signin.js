import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { signin } from '../../services/index';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinError, setSigninError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigninError('');

    try {
      const userData = {
        email,
        password,
      };

      const response = await signin(userData);
      sessionStorage.setItem('user_name', response.user.username);
      sessionStorage.setItem('user_id', response.user._id);
      navigate('/dashboard');

      // Clear form fields after successful signin
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error); // Handle error
      setSigninError(error.message);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', width: '500px', margin: '0 auto', padding: '40px', borderRadius: '5px' }}>
      <h2>Welcome to the Learning Management System</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <br/>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {signinError && <p style={{ color: 'red' }}>{signinError}</p>}

        <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
          Sign In
        </Button>
      </Form>
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/auth/sign-up">Sign up here</Link>.
      </p>
    </div>
  );
}

export default SignIn;
