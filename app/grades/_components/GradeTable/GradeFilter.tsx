"use client";

import { MenuItem, Select } from "@mui/material";
import { GradeFilters } from "@/types";

interface GradeFilterProps {
    filter: GradeFilters;
    setFilter: (filter: GradeFilters) => void;
}

export function GradeFilter({ filter, setFilter }: GradeFilterProps) {
    return (
        <Select
            size="small"
            value={filter}
            onChange={(event) => setFilter(event.target.value as GradeFilters)}
        >
            {Object.keys(GradeFilters).map((key) => (
                <MenuItem key={key} value={key}>
                    {GradeFilters[key as keyof typeof GradeFilters]}
                </MenuItem>
            ))}
        </Select>
    );
} 