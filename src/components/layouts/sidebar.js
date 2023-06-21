import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faBook, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../../images/logo.png';

function SideBar() {
  const [activeLink, setActiveLink] = useState('');

  const navigate = useNavigate();

  const mainLinkMap = [
    {
      icon: <FontAwesomeIcon icon={faHome} style={{ fill: activeLink === 'Classes' ? 'violet' : 'white', fontSize: '24px' }} />,
      label: 'Classes',
      link: '/class'
    },
    {
      icon: <FontAwesomeIcon icon={faUser} style={{ fill: activeLink === 'Dashboard' ? 'violet' : 'white', fontSize: '24px' }} />,
      label: 'Dashboard',
      link: '/dashboard'
    },
    {
      icon: <FontAwesomeIcon icon={faCog} style={{ fill: activeLink === 'LeaderBoard' ? 'violet' : 'white', fontSize: '24px' }} />,
      label: 'LeaderBoard',
      link: '/leaderboard'
    },
    {
      icon: <FontAwesomeIcon icon={faBook} style={{ fill: activeLink === 'Courses' ? 'violet' : 'white', fontSize: '24px' }} />,
      label: 'Courses',
      link: '/dashboard'
    },
    {
      icon: <FontAwesomeIcon icon={faCalendar} style={{ fill: activeLink === 'Schedule' ? 'violet' : 'white', fontSize: '24px' }} />,
      label: 'Schedule',
      link: '/dashboard'
    },
    // Add more dummy links here
    {
      icon: <FontAwesomeIcon icon={faUser} style={{ fill: activeLink === 'Profile' ? 'violet' : 'white', fontSize: '24px' }} />,
      label: 'Profile',
      link: '/dashboard'
    },
    {
      icon: <FontAwesomeIcon icon={faBook} style={{ fill: activeLink === 'Library' ? 'violet' : 'white', fontSize: '24px' }} />,
      label: 'Library',
      link: '/dashboard'
    },
    {
      icon: <FontAwesomeIcon icon={faCog} style={{ fill: activeLink === 'Settings' ? 'violet' : 'white', fontSize: '24px' }} />,
      label: 'Settings',
      link: '/dashboard'
    },
    {
      icon: <FontAwesomeIcon icon={faHome} style={{ fill: activeLink === 'Home' ? 'violet' : 'white', fontSize: '24px' }} />,
      label: 'Home',
      link: '/dashboard'
    },
    {
      icon: <FontAwesomeIcon icon={faCalendar} style={{ fill: activeLink === 'Calendar' ? 'violet' : 'white', fontSize: '24px' }} />,
      label: 'Calendar',
      link: '/dashboard'
    },
  ];

  const handleLinkClick = (link) => {
    setActiveLink(link.label);
    navigate(link.link);
  };

  return (
    <div className="d-flex flex-column bg-white text-dark p-4" style={{ height: '102vh' }}>
      <div className="text-center mb-4">
        <img src={Logo} alt="" className="w-50" />
      </div>
      <div>
        {mainLinkMap.map((link) => (
          <div
            key={link.label}
            className="d-flex align-items-center mb-4 p-2 link-item"
            onClick={() => handleLinkClick(link)}
            style={{ cursor: 'pointer' }}
          >
            {React.cloneElement(link.icon, {
              style: { fill: activeLink === link.label ? '#3c0b59' : 'white', fontSize: '24px', marginRight: '20px' }
            })}
            <span className="link-text" style={{ fontSize: '16px', color: activeLink === link.label ? '#3c0b59' : 'black' }}>
              {link.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
