import React from 'react'
import { StartSocket } from '../../socket' 
import './Defence.css'
const Defence = () => {
  StartSocket()
  return (
    <div className="defense">
      <h1 className="defense-title">Defence page</h1>

      <div className="defense-table-container">
        <table className="defense-table">
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
  )
}

export default Defence