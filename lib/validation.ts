import { z } from "zod";

export const gradeSchema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  grade: z.number().min(0).max(100, "Grade must be between 0 and 100"),
  subject: z.string().min(1, "Subject is required"),
});

export const numberInputSchema = z.object({
  numbers: z.array(z.number()).min(1, "At least one number is required"),
});

export type GradeInput = z.infer<typeof gradeSchema>;
export type NumberInput = z.infer<typeof numberInputSchema>;

export const validateGrade = (data: unknown) => {
  return gradeSchema.safeParse(data);
};

export const validateNumbers = (data: unknown) => {
  return numberInputSchema.safeParse(data);
}; 