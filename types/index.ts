export const GradeFilters = {
    all: "Show All Data",
    class_averages: "Show Class Averages",
    passing_averages: "Show Passing Averages",
    high_perf_classes: "Show High Performing Classes",
} as const;

export type GradeFilters = keyof typeof GradeFilters;
