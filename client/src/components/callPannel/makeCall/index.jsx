import { useState } from "react";
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
} from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100%",
  },
}));

const MakeCall = () => {
  const classes = useStyles();
  const [callFormDetails, setCallFormDetails] = useState({
    name: "",
    phone: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    const copyCallFormDetails = { ...callFormDetails };
    copyCallFormDetails[e.target.name] = e.target.value;
    setCallFormDetails(copyCallFormDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(callFormDetails);
  };

  return (
    <Grid container>
      <Grid container item xs={12} md={8} style={{ margin: "0 auto" }}>
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
            label="Caller Phone Number"
            placeholder="10 Digit Phone Number"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
            margin="dense"
            name="phone"
            value={callFormDetails.phone}
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
          <Button
            variant="contained"
            color="primary"
            startIcon={<CallIcon />}
            onClick={handleSubmit}
            disabled={
              callFormDetails.name.length === 0 ||
              callFormDetails.phone.length < 10 ||
              callFormDetails.duration.length === 0
            }
          >
            Call
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default MakeCall;
