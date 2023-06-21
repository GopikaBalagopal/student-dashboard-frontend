import React, { useState, useEffect } from 'react';
import { getSessions, getSessionById , completeClass } from '../../services/index';
import { toast } from 'react-toastify';

function Classes() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [noSessionFound, setnoSessionFound] = useState(true);
  const [userId, setuserId] = useState('')
  const [selectedSessionNumber, setselectedSessionNumber] = useState(1000)

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await getSessions();
        setSessions(sessions);
      } catch (error) {
        console.error(error);
      }
    };
    setuserId(sessionStorage.getItem('user_id'))
    fetchSessions();
  }, []);

  const fetchSessionById = async (sessionId) => {
    try {
      const session = await getSessionById(sessionId);
      setSelectedSession(session);
      setselectedSessionNumber(sessionId)
      setnoSessionFound(false)
    } catch (error) {
      setnoSessionFound(true);
      console.error(error);
    }
  };


  const handleCompleteSession = async (sessionId,number) => {
    try {
      await completeClass(sessionId, userId);
      fetchSessionById(number); // Fetch the updated session
      toast.success('class marked completed')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1 p-4" style={{ width: '70%' }}>
        <div className="mb-4 bg-primary text-white p-2 rounded" style={{backgroundColor:'#3c0b59'}}>
          <h2>Your Session</h2>
        </div>
        {!noSessionFound && selectedSession ? (
          <div className="card bg-white p-4 mb-4">
            <h4>{selectedSession.title}</h4>
            <p>Date: {new Date(selectedSession.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>Time: {selectedSession.time}</p>
            <hr />
            <p className="mt-3">Content:</p>
            <ul>
              {selectedSession.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button
                className={`btn btn-${selectedSession.completedBy.includes(userId) ? 'secondary' : 'primary'}`}
                onClick={() => handleCompleteSession(selectedSession._id,selectedSession.sessionNumber)}
              >
                {selectedSession.completedBy.includes(userId) ? 'Completed' : 'Complete'}
              </button>
          </div>
        ) : (
          <div className="card bg-white p-4 mb-4">
            <h4>No Session Available</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit, lorem sed rutrum malesuada, est
              felis rhoncus arcu, in congue enim ipsum eu urna.
            </p>
            <hr />
            <p className="mt-3">Content: No content available</p>
          </div>
        )}
      </div>
      <div className="flex-grow-1 p-4" style={{ width: '30%' }}>
        <div className="bg-white p-3 " style={{borderRadius:'10px'}}>
          <h2>Roadmap</h2>
          <div className="d-flex flex-wrap justify-content-start mb-4">
            {Array.from({ length: 30 }, (_, index) => (
              <div
                key={index}
                className={`rounded-circle bg-${selectedSessionNumber === index+1 ? 'dark' : 'primary'} text-white d-flex align-items-center justify-content-center m-2`}
                style={{ width: '40px', height: '40px', fontSize: '14px', cursor: 'pointer' }}
                onClick={() => fetchSessionById(index + 1)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        <br />
        <div className="bg-white p-3" style={{borderRadius:'10px'}}>
          <h3>Sessions</h3>
          {sessions.map((session) => (
            <div className="card bg-white p-3 mb-2" key={session._id}>
              <h5>{session.title}</h5>
              <p>{new Date(session.date).toDateString()} {new Date(session.date).getDay()} {session.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Classes;
