import React, { useEffect, useState } from "react"
import InfoBox from "./InfoBox"
import Table from "./Table"
// import Map from "./Map";
// import LineGraph from "./LineGraph";
import "./App.css"
import { sortData } from "./util"
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core"
import TableData from "./TableData"

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  // const [casesType, setCasesType] = useState("cases");
  const [tablePastData, setTablePastData] = useState([])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
        // console.log(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
          let sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries)
          // setMapCountries(data);
        })
    }

    getCountriesData()
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    setCountry(e.target.value)
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data)
        // console.log(countryInfo.todayDeaths)
        // console.log(data)
        // console.log(e.target.value)
      })
  }
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/jhucsse")
      .then((response) => response.json())
      .then((data) => {
        let tablePastData = data.filter((stat) => {
          return stat.country === "India"
        })
        // console.log(tablePastData)
        setTablePastData(tablePastData)
        // console.log(tablePastData)
      })
  }, [])

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={Math.random()} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          ></InfoBox>

          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          ></InfoBox>

          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          ></InfoBox>
        </div>
        {/* <div className="embed-container">
          <iframe
            width="500"
            height="400"
            // frameborder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            title="COVID-19"
            src="https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
          ></iframe>
        </div> */}
        <h6>
          Due to some issue with data sources, cann't get live feed from some
          countries, Thank you for Understanding
        </h6>
        <Card className="table--data">
          <CardContent>
            <h3>India's Covid Cases</h3>
            <TableData countriesData={tablePastData}></TableData>
          </CardContent>
        </Card>
      </div>
      <Card className="app__right">
        <CardContent className="app__right--table">
          <h3>Cases by Country</h3>

          <Table countries={tableData}></Table>
          {/* <LineGraph /> */}
        </CardContent>
      </Card>
    </div>
  )
}

export default App
