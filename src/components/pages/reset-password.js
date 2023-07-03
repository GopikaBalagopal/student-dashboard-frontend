import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { resetPassword } from '../../services/index';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResetError('');

    if (password !== confirmPassword) {
      setResetError("Passwords don't match");
      return;
    }

    try {
      const id = sessionStorage.getItem('user_id')
      await resetPassword({ id, password });
      toast.success('Password Reset successfull')
      navigate('/dashboard')
    } catch (error) {
      console.error(error); // Handle error
      setResetError(error.message);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', width: '500px', margin: '0 auto', padding: '40px', borderRadius: '5px' }}>
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <br />

        {resetError && <p style={{ color: 'red' }}>{resetError}</p>}

        <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
          Reset Password
        </Button>
      </Form>
      <p style={{ marginTop: '20px' }}>
        Remembered your password? <Link to="/auth/sign-in">Sign in here</Link>.
      </p>
    </div>
  );
}

export default ResetPassword;
