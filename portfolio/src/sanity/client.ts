import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "",
  dataset: "production",
  apiVersion: "2025-03-01",
  useCdn: false,
});

