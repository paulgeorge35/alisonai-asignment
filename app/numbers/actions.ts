"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const numberSchema = z.object({
    ID_1: z.number(),
    NUMBER_1: z.number(),
    ID_2: z.number(),
    NUMBER_2: z.number(),
    SUM: z.number(),
});

export async function getNumbers() {
    try {
        const numbers = await db`
            SELECT 
                n1.id as "ID_1",
                n1.value as "NUMBER_1",
                n2.id as "ID_2",
                n2.value as "NUMBER_2",
            (n1.value + n2.value) as "SUM"
        FROM numbers n1
        JOIN numbers n2 ON n2.id = n1.id + 1
        ORDER BY n1.id
    `;
        const parsedNumbers = z.array(numberSchema).parse(numbers);
        return parsedNumbers;
    } catch (error) {
        console.error("Failed to get numbers", error);
        return [];
    }
}

const addNumberSchema = z.object({
    number: z.number(),
});

export async function addNumber(number: number) {
    try {
        const parsedNumber = addNumberSchema.parse({ number });
        await db`INSERT INTO numbers (value) VALUES (${parsedNumber.number})`;
        revalidatePath("/numbers");
        return { success: true, message: "Number added successfully" };
    } catch (error) {
        console.error("Failed to add number", error);
        return { success: false, message: "Failed to add number" };
    }
}