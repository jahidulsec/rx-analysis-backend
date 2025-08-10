import { db } from "@/db/db";
import { medicineTable, surveyMedicineTable, surveyTable } from "@/db/schema";
import { between, count, eq, sum } from "drizzle-orm";

const getTotalSurveyCount = async (date?: Date) => {
  const now = date ? new Date(date) : new Date();

  console.log(now);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // last day of month

  const survey = await db
    .select({ count: count() })
    .from(surveyTable)
    .where(between(surveyTable.createdAt, startOfMonth, endOfMonth))
    .limit(1);

  const medicine = await db
    .select({
      type: medicineTable.type,
      quantity: sum(surveyMedicineTable.quantity),
    })
    .from(surveyMedicineTable)
    .innerJoin(
      medicineTable,
      eq(surveyMedicineTable.medicineId, medicineTable.id)
    )
    .where(between(surveyMedicineTable.createdAt, startOfMonth, endOfMonth))
    .groupBy(medicineTable.type);
  return { totalSurvey: survey[0].count, medicineCount: medicine };
};

export const statsLib = {
  getTotalSurveyCount,
};
