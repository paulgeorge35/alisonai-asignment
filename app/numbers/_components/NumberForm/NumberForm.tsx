"use client";

import { Button, Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import styles from "./NumberForm.module.css";
import { addNumber } from "../../actions";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";

const addNumberSchema = z.object({
    number: z.number({
        invalid_type_error: "Format is invalid",
        required_error: "Number is required",
    })
});

export default function NumberForm() {
    const form = useForm({
        validators: {
            onChange: addNumberSchema,
        },
        defaultValues: {} as z.infer<typeof addNumberSchema>,
        onSubmit: async ({ value }) => {
            if (value.number) {
                const result = await addNumber(value.number);
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
                <Typography variant="h6">Add a number</Typography>
            } />
            <CardContent>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <form.Field
                        name="number"
                    >
                        {(field) => (
                            <>
                                <TextField
                                    value={field.state.value ?? ""}
                                    onChange={(e) => field.handleChange(e.target.value ? Number(e.target.value) : "" as unknown as number)}
                                    sx={{
                                        width: "100%",
                                    }}
                                    label="Enter a number"
                                    type="number"
                                    slotProps={{
                                        input: {
                                            endAdornment: <form.Subscribe selector={(state) => [state.isSubmitting, state.isValid, state.isDirty]}>
                                                {([isSubmitting, isValid, isDirty]) => (
                                                    <Button type="submit" disabled={isSubmitting || !isValid || !isDirty}>Add</Button>
                                                )}
                                            </form.Subscribe>
                                        }
                                    }}
                                    error={field.state.meta.errors.length > 0}
                                    helperText={field.state.meta.errors[0]?.message}
                                />
                            </>
                        )}
                    </form.Field>
                </form>
            </CardContent>
        </Card>
    )
}