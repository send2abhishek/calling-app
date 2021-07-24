import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

import { getCallHistory } from "app/APICallsHandler";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CallHistory = () => {
  const classes = useStyles();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { success } = await getCallHistory();

      if (success) {
        setRows(success);
      }
    };
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Caller Name</TableCell>
            <TableCell>Call From</TableCell>
            <TableCell>Call To</TableCell>
            <TableCell>Call Duration(sec)</TableCell>
            <TableCell>Call Request Uuid</TableCell>
            <TableCell>TimeStamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Id}>
              <TableCell component="th" scope="row">
                {row.Id}
              </TableCell>
              <TableCell>{row.callerName}</TableCell>
              <TableCell>{row.callFrom}</TableCell>
              <TableCell>{row.callTo}</TableCell>
              <TableCell>{row.callDuration}</TableCell>
              <TableCell>{row.callRequestUuid}</TableCell>
              <TableCell>
                {moment(row.createdAt).format("MMMM Do YYYY, h:mm A")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CallHistory;
