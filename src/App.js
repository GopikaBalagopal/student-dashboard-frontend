import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import SideBar from './components/layouts/sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopBar from './components/layouts/topbar';
import { useRoutes, useNavigate } from 'react-router-dom';
import routes from './routes';
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const content = useRoutes(routes(true));
  const [url, seturl] = useState('');

  useEffect(() => {
    seturl(window.location.href);

    const user_id = sessionStorage.getItem('user_id');
    if (!user_id && !url.includes('auth')) {
      navigate('/auth/sign-in');
    }
  }, [navigate, url]);

  return (
    <>
      <ToastContainer theme="dark" autoClose={1700} />
      {!url.includes('auth') ? (
        <div className="container">
          <SideBar />
          <div className="content" key={url}>
            <TopBar />
            {content}
          </div>
        </div>
      ) : (
        <div className="auth_parent">{content}</div>
      )}
    </>
  );
}

export default App;
