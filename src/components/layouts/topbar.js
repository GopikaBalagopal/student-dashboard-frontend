import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function TopBar() {
  const [page, setPage] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('user_name')
    toast.success('Logged out of the account');
    navigate('/auth/sign-in');
  };

  useEffect(() => {
    const links = {
      '/dashboard': 'Dashboard',
      '/class': 'Classes',
      '/leaderboard': 'Leaderboard',
    };

    const currentPage = links[window.location.pathname];
    setPage(currentPage);
    const storedUserName = sessionStorage.getItem('user_name');
    setUserName(storedUserName);
  }, []);

  return (
    <div className="top-bar d-flex justify-content-between align-items-center border-bottom p-3">
      <div className="page-title">
        <h1>{page}</h1>
      </div>

      <div className="user-section d-flex align-items-center">
        <span className="user-name me-3" style={{ fontSize: '25px' }}>
          {userName}
        </span>
        <FontAwesomeIcon
          icon={faUserCircle}
          onClick={() => navigate('/profile')}
          className="user-icon me-3"
          size="2x"
        />
        <FontAwesomeIcon
          icon={faSignOutAlt}
          onClick={handleSignOut}
          className="sign-out-icon"
          size="2x"
        />
      </div>
    </div>
  );
}

export default TopBar;
