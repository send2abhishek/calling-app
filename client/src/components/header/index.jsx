import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <Typography component="div" className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="h1" className={classes.title}>
            Calling App
          </Typography>
        </Toolbar>
      </AppBar>
    </Typography>
  );
}
