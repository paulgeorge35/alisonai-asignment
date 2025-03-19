"use server";

import { GradeFilters } from "@/types";
import GradeForm from "./_components/GradeForm/GradeForm";
import GradeTable from "./_components/GradeTable/GradeTable";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

export default async function GradesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter: GradeFilters }>;
}) {
  const { filter = "all" } = await searchParams;

  async function handleFilterChange(filter: GradeFilters) {
    "use server";
    redirect(`/grades?filter=${filter}`);
  }

  return (
    <div className={styles.main}>
      <GradeForm />
      <GradeTable filter={filter} setFilter={handleFilterChange} />
    </div>
  )
}