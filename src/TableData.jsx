import React from "react"
// import "./Table.css";
import "./TableData.css"

function TableData({ countriesData }) {
  return (
    <table className="tableData">
      <tbody>
        <tr>
          <th>Sl No:</th>
          <th>States</th>
          <th>Confirmed</th>
          <th>Death's</th>
        </tr>
        {countriesData.map((country, index) => (
          <tr key={Math.random()}>
            <td>{index + 1}</td>
            <td>{country.province}</td>
            <td>{country.stats.confirmed}</td>
            <td>{country.stats.deaths}</td>

            {/* <td>{country.confirmed}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableData
