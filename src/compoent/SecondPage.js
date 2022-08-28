import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { TablePagination } from "@mui/material";

const SecondPage = () => {
  const localdataShow =
    localStorage.getItem("UserData") !== null || undefined || []
      ? JSON.parse(localStorage.getItem("UserData"))
      : [];
  console.log(
    "🚀 ~ file: SecondPage.js ~ line 12 ~ SecondPage ~ localdataShow",
    localdataShow
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date of Birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {localdataShow.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((item, index) => {
            return (
              <TableRow
                key={`${item},${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={localdataShow.length}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
};

export default SecondPage;
