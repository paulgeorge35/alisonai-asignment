import { TableContainer, TableHead, TableRow, Table, TableBody, TableCell, Paper, Toolbar, Typography } from "@mui/material";
import { getGrades } from "../../actionts";
import { use } from "react";
import { GradeFilters } from "@/types";
import { GradeFilter } from "./GradeFilter";
import styles from "./GradeTable.module.css";

interface GradesTableProps {
    filter: GradeFilters;
    setFilter: (filter: GradeFilters) => void;
}

export default function GradeTable({ filter, setFilter }: GradesTableProps) {
    const grades = use(getGrades(filter));
    const showId = filter === "all";
    const isAverage = filter !== "all";

    return (
        <Paper>
            <Toolbar className={styles.toolbar}>
                <Typography variant="h6">Grades</Typography>
                <GradeFilter filter={filter} setFilter={setFilter} />
            </Toolbar>
            <TableContainer>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            {showId && <TableCell>ID</TableCell>}
                            <TableCell>Class</TableCell>
                            <TableCell> {isAverage ? "Average Grade" : "Grade"}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {grades.map((grade, index) => (
                            <TableRow
                                key={index}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                {showId && <TableCell>{grade.id}</TableCell>}
                                <TableCell>{grade.class}</TableCell>
                                <TableCell>{grade.grade}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}