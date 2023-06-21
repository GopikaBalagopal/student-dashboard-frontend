import React from 'react';
import LineChart from '../charts/lineChart';
import BarChart from '../charts/barChart';

function Dashboard() {
    return (
        <div className="mt-4 ml-2" style={{marginLeft:'20px'}}>
            <div className="d-flex mb-3">
                <div>
                    <h3>CodeKata</h3>
                    <div style={{height:'15vw',width:'31vw'}}>
                        <BarChart/>
                    </div>
                </div>
                <div>
                    <h3>WebKata</h3>
                    <div style={{height:'15vw',width:'31vw'}}>
                        <BarChart/>
                    </div>
                </div>
            </div>
            <div className="d-flex">
                <div>
                    <h3>Tasks</h3>
                    <div style={{height:'15vw',width:'50vw'}}>
                        <LineChart/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
