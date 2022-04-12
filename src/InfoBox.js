import React from "react"
import { Card, CardContent, Typography } from "@material-ui/core"

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox__cases">
          {" "}
          Today:{" "}
          {cases ? cases : <span style={{ color: "tomato" }}>"Error!"</span>}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
