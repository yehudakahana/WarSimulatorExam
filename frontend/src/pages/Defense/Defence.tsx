import React, { useState, useEffect } from 'react';
import { connectWebSocket, onRocketLaunched, onMissilesData, emitUserDetails, interceptRocket } from '../../socket';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { loadMissiles, interceptMissile } from '../../store/missilesSlice';
import './Defence.css';

interface Missile {
  id: string;
  name: string;
  status: 'available' | 'launched' | 'intercepted';
}

interface Rocket {
  id: string;
  type: string;
  timeToHit: string;
  status: string;
  senderName: string | "Hamas";
}

const DefencePage = () => {
  const dispatch = useDispatch();
  const organization = 'IDF';
  const missiles = useSelector((state: RootState) => state.missiles.missiles);
  const [rockets, setRockets] = useState<Rocket[]>([]);

 
  useEffect(() => {
    connectWebSocket();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    emitUserDetails({ username: user.username ||'aa' });
    onMissilesData((data) => {
      dispatch(loadMissiles(data));

    });

    return () => {};
  }, []);


  const handleIntercept = (rocketId: string, rocketType: string) => {
    const missile = missiles.find(missile => missile.name === rocketType && missile.status === 'available');
    if (missile) {
      interceptRocket({ rocketId });
      dispatch(interceptMissile(missile.id));
      setRockets(prevRockets =>
        prevRockets.map(rocket =>
          rocket.id === rocketId ? { ...rocket, status: "Intercepted" } : rocket
        )
      );
    } else {
      alert("No suitable missile available or all missiles are used.");
    }
  };

  return (
    <div className="defence-container">
      <h2>לוח בקרה - הגנה</h2>

      <div className="organization-section">
        <p><strong>ארגון:</strong> {organization}</p>
        <h4>טילים זמינים</h4>
        <ul className="missiles-list">
          {missiles.map(missile => (
            <li key={missile.id}>{missile.name}: * {missile.amount !== null ? missile.amount?.toString() : ""}</li>
          ))}
        </ul>
      </div>

      <h4>רקטות משוגרות</h4>
      <table className="rockets-table">
        <thead>
          <tr>
            <th>סוג רקטה</th>
            <th>זמן להגיע</th>
            <th>שם השולח</th>
            <th>סטטוס</th>
          </tr>
        </thead>
        <tbody>
          {rockets.map((rocket) => (
            <tr key={rocket.id}>
              <td>{rocket.type}</td>
              <td>{rocket.timeToHit}</td>
              <td>{rocket.senderName}</td>
              <td>
                {rocket.status}
                {rocket.status === "Launched" ? (
                  <button onClick={() => handleIntercept(rocket.id, rocket.type)} className="intercept-button">X</button>
                ) : (
                  rocket.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DefencePage;









// import React, { useState, useEffect } from 'react';
// import { connectWebSocket, onRocketLaunched, onMissilesData, interceptRocket } from '../../socket';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../store/store';
// import { loadMissiles, interceptMissile } from '../../store/missilesSlice';

// interface Missile {
//   id: string;
//   name: string;
//   status: 'available' | 'launched' | 'intercepted';
// }

// interface Rocket {
//   id: string;
//   type: string;
//   timeToHit: string;
//   status: string;
//   senderName: string | "Hamas"; 
// }

// const DefencePage = () => {
//   const dispatch = useDispatch();
//   const organization = 'IDF'; 
//   const missiles = useSelector((state: RootState) => state.missiles.missiles);
//   const [rockets, setRockets] = useState<Rocket[]>([]);
//   // const [selectedMissile, setSelectedMissile] = useState<string>(''); 
//   // const [targetZone, setTargetZone] = useState<string>(''); 

//   useEffect(() => {
//     connectWebSocket();

//     onRocketLaunched((data: Rocket) => {
//       setRockets((prevRockets) => [...prevRockets, data]);
//     });

//     onMissilesData((data: Missile[]) => {
//       dispatch(loadMissiles(data));
//     });
//   }, [dispatch]);

//   const handleIntercept = (rocketId: string, rocketType: string) => {
//     const missile = missiles.find(missile => missile.name === rocketType && missile.status === 'available');
//     if (missile) {
//       interceptRocket({ rocketId });
//       dispatch(interceptMissile(missile.id));
//       setRockets(prevRockets =>
//         prevRockets.map(rocket =>
//           rocket.id === rocketId ? { ...rocket, status: "Intercepted" } : rocket
//         )
//       );
//     } else {
//       alert("No suitable missile available or all missiles are used.");
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h2>לוח בקרה - הגנה</h2>

//       <div>
//         <p><strong>ארגון:</strong> {organization}</p>
//         <h4>טילים זמינים</h4>
//         <ul>
//           {missiles.filter(m => m.status === 'available').map(missile => (
//             <li key={missile.id}>{missile.name}</li>
//           ))}
//         </ul>
//       </div>

//       <h4>רקטות משוגרות</h4>
//       <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
//         <thead>
//           <tr>
//             <th style={{ border: '1px solid #ddd', padding: '8px' }}>טיל</th>
//             <th style={{ border: '1px solid #ddd', padding: '8px' }}>סוג</th>
//             <th style={{ border: '1px solid #ddd', padding: '8px' }}>שם השולח</th>
//             <th style={{ border: '1px solid #ddd', padding: '8px' }}>סטטוס</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rockets.map((rocket) => (
//             <tr key={rocket.id}>
//               <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rocket.type}</td>
//               <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rocket.timeToHit}</td>
//               <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rocket.senderName}</td>
//               <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rocket.status}
//                 {rocket.status === "Launched" ? (
//                   <button onClick={() => handleIntercept(rocket.id, rocket.type)} style={{ color: "red" }}>X</button>
//                 ) : (
//                   rocket.status
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DefencePage;





