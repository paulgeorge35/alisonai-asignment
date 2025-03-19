"use server";

import db from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Class } from "@prisma/client";

const gradeSchema = z.object({
    id: z.number().optional(),
    class: z.nativeEnum(Class),
    grade: z.number(),
});

type GradeFilters = "all" | "class_averages" | "passing_averages" | "high_perf_classes";

const PASSING_GRADE = 55;
const HIGH_PERF_GRADE = 70;

const getGradesQuery = async (filter: GradeFilters): Promise<z.infer<typeof gradeSchema>[]> => {
    switch (filter) {
        case "all":
            return await db`SELECT * FROM grades`;
        case "class_averages":
            return await db`SELECT class, CAST(ROUND(AVG(grade), 2) as FLOAT) as grade FROM grades GROUP BY class`;
        case "passing_averages":
            return await db`SELECT class, CAST(ROUND(AVG(grade), 2) as FLOAT) as grade FROM grades WHERE grade > ${PASSING_GRADE} GROUP BY class`;
        case "high_perf_classes":
            return await db`SELECT class, CAST(ROUND(AVG(grade), 2) as FLOAT) as grade FROM grades GROUP BY class HAVING AVG(grade) > ${HIGH_PERF_GRADE}`;
    }
}

export async function getGrades(filter: GradeFilters = "all") {
    try {
        const grades = await getGradesQuery(filter);
        const parsedGrades = z.array(gradeSchema).parse(grades);

        return parsedGrades;
    } catch (error) {
        console.log("Error fetching grades", error);
        return [];
    }
}

const addGradeSchema = z.object({
    class: z.nativeEnum(Class),
    grade: z.number(),
});

export async function addGrade(grade: z.infer<typeof addGradeSchema>) {
    try {
        const parsedGrade = addGradeSchema.parse(grade);
        await db`
            INSERT INTO grades (class, grade) VALUES (${parsedGrade.class}, ${parsedGrade.grade})
        `;
        revalidatePath("/grades");
        return { success: true, message: "Grade added successfully" };
    } catch (error) {
        console.error("Failed to add grade", error);
        return { success: false, message: "Failed to add grade" };
    }
}