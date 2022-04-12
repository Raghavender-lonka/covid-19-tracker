import React from "react"
import "./Table.css"

function Table({ countries }) {
  return (
    <table className="table">
      <tbody>
        {countries.map((country, cases) => (
          <tr key={Math.random()}>
            <td>{country.country}</td>
            <td>{country.cases}</td>

            {/* <td>
              <strong>{numeral(country.cases).format("0,0")}</strong>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
