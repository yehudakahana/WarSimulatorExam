import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setLocation, launchRocket } from '../../store/attackSlisce';
import { connectWebSocket, launchRocket as sendRocketLaunch } from '../../socket';
import { loadMissiles, interceptMissile } from '../../store/missilesSlice';
import { Missile } from "../../store/missilesSlice";
import { onMissilesData, emitUserDetails } from "../../socket";
import { AttackState, loadState } from "../../store/attackSlisce";
import './Attack.css';

const AttackPage = () => {
  const dispatch = useDispatch();
  const { organization, location, ammo, launchedRockets } = useSelector((state: RootState) => state.attack);
  const { missiles } = useSelector((state: RootState) => state.missiles);

  useEffect(() => {
    connectWebSocket();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    emitUserDetails({ username: user.username ||'aa' });
    onMissilesData((data) => {
      dispatch(loadMissiles(data));

      const attackStateData: AttackState = {
        organization: user.organization ||'Hamas',
        location: 'North',
        ammo: {
          Grad: 1,
          SuperSonic: 7,
          BoomMissile: 2,
          Kasam: 65
        },
        launchedRockets: []
      };
      dispatch(loadState(attackStateData));
    });

    return () => {};
  }, []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocation(e.target.value));
  };

  const handleLaunch = (rocketType: string) => {
    if (ammo[rocketType] > 0) {
      const newRocket = {
        id: Math.random().toString(36).substr(2, 9),
        type: rocketType,
        timeToHit: '1:17m',
        status: 'Launched',
      };
      dispatch(launchRocket(newRocket));
      sendRocketLaunch({ ...newRocket, location });
    } else {
      alert('No ammo left for this rocket');
    }
  };

  return (
    <div className="attack-page">
      <h2>Attack Page</h2>
      <p>Organization: {organization}</p>
      <div className="location">
        <label>
          Location:
          <select value={location} onChange={handleLocationChange}>
            <option value="North">North</option>
            <option value="Center">Center</option>
            <option value="South">South</option>
          </select>
        </label>
      </div>
      <h4>Available Ammo</h4>
      <div className="missile-buttons">
        {missiles.map((missile: Missile) => (
          <button onClick={() => handleLaunch(missile.name)} key={missile.name}>
            {missile.name}: * {missile.amount !== null ? missile.amount?.toString() : ""}
          </button>
        ))}
      </div>

      <h4>Launched Rockets</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Rocket</th>
              <th>Time to Hit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {launchedRockets.map((rocket) => (
              <tr key={rocket.id}>
                <td>{rocket.type}</td>
                <td>{rocket.timeToHit}</td>
                <td>{rocket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttackPage;
