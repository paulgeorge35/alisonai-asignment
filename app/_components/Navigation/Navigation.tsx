import { Button } from "@mui/material";
import { Toolbar, Typography } from "@mui/material";
import { AppBar } from "@mui/material";
import styles from "./Navigation.module.css";
import Link from "next/link";

export default function Navigation() {
    return (
        <AppBar position="static">
            <Toolbar className={styles.navigation}>
                <Typography variant="h6">Alison AI - Assignment</Typography>
                <Link href="/numbers" style={{ marginLeft: "auto"}}>
                    <Button color="inherit">Numbers</Button>
                </Link>
                <Link href="/grades">
                    <Button color="inherit">Grades</Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}