import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { getLeaderboard } from '../../services/index'; // Import the getLeaderboard API function

function LeaderBoards() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const data = await getLeaderboard();
      setLeaderboardData(data);
    } catch (error) {
      console.error(error);
      // Handle error scenario
    }
  };

  return (
    <div className="mt-5" style={{ margin: '20px' }}>
      <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Top Performance</h2>
      <Table responsive striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Hours Completed</th>
            <th>Sessions Completed</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.hoursCompleted}</td>
              <td>{user.sessionCompleted}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '1rem' }}>
        * The leaderboard showcases the top performers based on hours completed and sessions completed.
      </p>
    </div>
  );
}

export default LeaderBoards;
