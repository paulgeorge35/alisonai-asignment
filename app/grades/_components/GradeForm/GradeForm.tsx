"use client";

import { Card, CardContent, CardHeader, InputLabel, MenuItem, FormControl, Select, TextField, Button, Typography } from "@mui/material";
import { Class } from "@prisma/client";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { addGrade } from "../../actionts";
import { toast } from "sonner";
import styles from "./GradeForm.module.css";

const addGradeSchema = z.object({
    class: z.nativeEnum(Class),
    grade: z.number({
        invalid_type_error: "Format is invalid",
        required_error: "Grade is required",
    }).min(0, { message: "Grade must be at least 0" }).max(100, { message: "Grade must be at most 100" }),
});

export default function GradeForm() {
    const form = useForm({
        validators: {
            onChange: addGradeSchema,
        },
        defaultValues: {} as z.infer<typeof addGradeSchema>,
        onSubmit: async ({ value }) => {
            if (value) {
                const result = await addGrade(value);
                if (!result.success) {
                    toast.error(result.message);
                } else {
                    toast.success(result.message);
                }
                form.reset();
            }
        },
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
    }

    return (
        <Card>
            <CardHeader title={
                <Typography variant="h6">Add Grade</Typography>
            } />
            <CardContent>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <form.Field name="class">
                        {(field) => (
                            <FormControl fullWidth>
                                <InputLabel id="class-label">Class</InputLabel>
                                <Select
                                    labelId="class-label"
                                    id="class-select"
                                    label="Class"
                                    value={field.state.value ?? ""}
                                    onChange={(event) => field.handleChange(event.target.value as Class)}
                                >
                                    {Object.values(Class).map((className) => (
                                        <MenuItem key={className} value={className}>{className}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </form.Field>
                    <form.Field name="grade">
                        {(field) => (
                            <TextField
                                label="Grade"
                                placeholder="Enter a grade (0-100)"
                                name="grade"
                                type="number"
                                sx={{ width: "100%" }}
                                required
                                value={field.state.value ?? ""}
                                onChange={(e) => field.handleChange(e.target.value ? Number(e.target.value) : "" as unknown as number)}
                                error={!!field.state.meta.errors.length}
                                helperText={field.state.meta.errors[0]?.message}
                            />
                        )}
                    </form.Field>
                    <form.Subscribe selector={(state) => [state.isSubmitting, state.isValid, state.isDirty]}>
                        {([isSubmitting, isValid, isDirty]) => (
                            <Button
                                size="large"
                                type="submit"
                                disabled={isSubmitting || !isValid || !isDirty}
                                sx={{
                                    width: "100%",
                                }}
                            >
                                Submit
                            </Button>
                        )}
                    </form.Subscribe>
                </form>
            </CardContent>
        </Card>
    )
}
