import React from 'react';
import { StartSocket } from '../../socket';
import './Attack.css';

const Attack = () => {
  StartSocket();

  return (
    <div className="attack">
      <h1 className="attack-title">Attack page</h1>

      <div className="attack-table-container">
        <table className="attack-table">
          <thead>
            <tr>
              <th>rocket</th>
              <th>time to hit</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>רקטה 1</td>
              <td>10 שניות</td>
              <td>בהשקה</td>
            </tr>
            <tr>
              <td>רקטה 2</td>
              <td>5 שניות</td>
              <td>שוגרה</td>
            </tr>
            <tr>
              <td>רקטה 3</td>
              <td>20 שניות</td>
              <td>מוכנה</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attack;
