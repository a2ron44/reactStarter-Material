import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { tableStyles } from "styles/tableStyles";

const useStyles = tableStyles;

const GovOfficeTable = ({ govOffices, handleOpen }) => {
  const classes = useStyles();

  const headCells = [{ id: "name", label: "Name" }];

  return (
    <>
      <Typography variant="h6">
        Offices ({govOffices.length > 0 ? govOffices.length : 0})
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id} className={classes.tableHeadCell}>
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {govOffices.map((row, i) => {
              return (
                <TableRow key={row.id} onClick={() => handleOpen(row)} hover>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GovOfficeTable;
