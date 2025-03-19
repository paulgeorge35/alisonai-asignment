import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { use } from "react";
import { getNumbers } from "../../actions";
import styles from "./NumberTable.module.css";

export default function NumberTable() {
    const numbers = use(getNumbers());

    return (
        <TableContainer component={Paper}>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID 1</TableCell>
                        <TableCell>Number 1</TableCell>
                        <TableCell>ID 2</TableCell>
                        <TableCell>Number 2</TableCell>
                        <TableCell>Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {numbers.map((number) => (
                        <TableRow
                            key={number.ID_1}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell>{number.ID_1}</TableCell>
                            <TableCell>{number.NUMBER_1}</TableCell>
                            <TableCell>{number.ID_2}</TableCell>
                            <TableCell>{number.NUMBER_2}</TableCell>
                            <TableCell>{number.SUM}</TableCell>
                        </TableRow>
                    ))}
                    {numbers.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} align="center">No numbers found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}