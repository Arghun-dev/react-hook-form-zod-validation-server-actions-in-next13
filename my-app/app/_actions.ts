"use server";

import { z } from "zod";
import { FormDataSchema } from "@/lib/schema";

type Inputs = z.infer<typeof FormDataSchema>;

export async function addEntry(data: Inputs) {
  const result = FormDataSchema.safeParse(data);

  if (result.success) {
    // This is where you talk to your database, this is where you would do anything that you would have done inside your API endpoint.
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
