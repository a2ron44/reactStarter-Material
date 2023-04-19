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

const GovUserTable = ({ govUsers, handleOpen }) => {
  const classes = useStyles();

  const headCells = [
    { id: "email", label: "Email" },
    { id: "Role", label: "Role" },
  ];

  return (
    <>
      <Typography variant="h6">
        Government Users ({govUsers.totalItems > 0 ? govUsers.totalItems : 0})
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
            {govUsers.items.map((row, i) => {
              return (
                <TableRow key={row.id} onClick={() => handleOpen(row)} hover>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.governmentRoleName}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GovUserTable;
