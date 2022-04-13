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
  const [countriesData, setCountriesData] = useState("India")
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
          // console.log(countries)
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
    const onCountryDataChanget = async () => {
      let tablePastData = []
      await fetch("https://disease.sh/v3/covid-19/jhucsse")
        .then((response) => response.json())
        .then((data) => {
          tablePastData = data.filter((stat) => {
            return stat.country === "India"
          })
          setTablePastData(tablePastData)
        })
    }
    onCountryDataChanget()
  }, [])

  const onCountryDataChange = async (e) => {
    let countriesData = e.target.value
    setCountriesData(e.target.value)
    let tablePastData = []
    await fetch("https://disease.sh/v3/covid-19/jhucsse")
      .then((response) => response.json())
      .then((data) => {
        tablePastData = data.filter((stat) => {
          if (countriesData === "UK") {
            return stat.country === "United Kingdom"
          } else if (countriesData === "USA") {
            return stat.country === "US"
          } else {
            return stat.country === countriesData
          }
        })
        setTablePastData(tablePastData)
        console.log(tablePastData)
        console.log(countriesData)
        console.log(data)
      })
  }

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
            title="Live Cases"
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

        <h6>
          Due to some issue with data sources, cann't get live feed from some
          countries, Thank you for Understanding
        </h6>
        <Card className="table--data">
          <CardContent>
            <div className="table--data__header">
              <h2>Covid-19 Cases by states(or)provinces</h2>
              <FormControl className="app__dropdown">
                <Select
                  variant="outlined"
                  value={countriesData}
                  onChange={onCountryDataChange}
                  // onSelect={onCountryChange}
                >
                  <MenuItem value="India" selected>
                    India
                  </MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={Math.random()} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
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
