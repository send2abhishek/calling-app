import { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  InputAdornment,
  Select,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import CallEndIcon from "@material-ui/icons/CallEnd";

import Backdrop from "components/Backdrop/";
import { secondsToTime } from "utils/misc";
import { dialCallToUser, disConnectCall } from "app/APICallsHandler";

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  root: {
    margin: "0 auto",
  },
  textBold: {
    fontWeight: "bold",
  },
}));

var timer;

const MakeCall = () => {
  const classes = useStyles();
  const [callFormDetails, setCallFormDetails] = useState({
    name: "",
    to: "",
    from: "",
    duration: "",
  });
  const [callButtonState, setCallButtonState] = useState(false);
  const [requestUuid, setRequestUuid] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [ellapsedTime, setEllapsedTime] = useState(0);
  const [dataFetchingStatus, setDataFetchingStatus] = useState(false);

  useEffect(() => {
    if (callDuration !== 0) {
      timer = setInterval(() => {
        setEllapsedTime((state) => state + 1);
      }, 1000);
    }
  }, [callDuration]);

  useEffect(() => {
    if (callDuration === ellapsedTime) {
      clearInterval(timer);
    }
  }, [callDuration, ellapsedTime]);

  const handleInputChange = (e) => {
    const copyCallFormDetails = { ...callFormDetails };
    copyCallFormDetails[e.target.name] = e.target.value;
    setCallFormDetails(copyCallFormDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCallButtonState(true);
    setDataFetchingStatus(true);
    const { success, error } = await dialCallToUser(callFormDetails);

    if (success) {
      setCallDuration(callFormDetails.duration * 60);
      setRequestUuid(success.requestUuid);
      setDataFetchingStatus(false);
    } else {
      alert(error);
      setRequestUuid(null);
      setCallButtonState(false);
      setDataFetchingStatus(false);
    }
  };

  const handleCallDisconnect = async (e) => {
    e.preventDefault();
    setDataFetchingStatus(true);
    const { success } = await disConnectCall(requestUuid);
    if (success) {
      setRequestUuid(null);
      setDataFetchingStatus(false);
    } else {
      setDataFetchingStatus(false);
    }
    clearInterval(timer);
    setEllapsedTime(0);
    setCallDuration(0);
    setCallButtonState(false);
  };

  let displayTime = callButtonState ? secondsToTime(ellapsedTime) : null;

  return (
    <Grid container>
      <Grid container item xs={12} md={8} className={classes.root}>
        <Backdrop show={dataFetchingStatus} />
        <form className={classes.fullWidth}>
          <TextField
            id="caller-name"
            label="Caller Name"
            fullWidth
            margin="dense"
            inputProps={{
              maxLength: 30,
            }}
            name="name"
            value={callFormDetails.name}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <TextField
            type="number"
            id="caller-phone-number"
            label="Your Phone Number"
            placeholder="10 Digit Phone Number"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
            margin="dense"
            name="from"
            value={callFormDetails.from}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <TextField
            type="number"
            id="seder-phone-number"
            label="Recipient Phone Number"
            placeholder="10 Digit Phone Number"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
            margin="dense"
            name="to"
            value={callFormDetails.to}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="select-field-label">
              Select Call Duration{" "}
            </InputLabel>
            <Select
              labelId="select-field-label"
              id="select-field"
              name="duration"
              value={callFormDetails.duration}
              onChange={handleInputChange}
            >
              <MenuItem value={5}>5 Minutes</MenuItem>
              <MenuItem value={10}>10 Minutes</MenuItem>
              <MenuItem value={15}>15 Minutes</MenuItem>
            </Select>
          </FormControl>
          <Typography
            component="div"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<CallIcon />}
              onClick={handleSubmit}
              disabled={
                callFormDetails.name.length === 0 ||
                callFormDetails.to.length < 10 ||
                callFormDetails.from.length < 10 ||
                callFormDetails.duration.length === 0 ||
                callButtonState
              }
            >
              Call
            </Button>
            {callButtonState && (
              <Typography>
                Call Duration -{" "}
                <span className={classes.textBold}>
                  {displayTime && displayTime.m}:{displayTime && displayTime.s}
                </span>
              </Typography>
            )}
            {callButtonState && (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CallEndIcon />}
                onClick={handleCallDisconnect}
                disabled={!callButtonState}
              >
                Call Disconnect
              </Button>
            )}
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
};

export default MakeCall;
