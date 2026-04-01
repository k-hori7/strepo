import type { Employee } from "@/types/project";

export const defaultEmployees: Employee[] = [
  { id: "emp-1", name: "受検者 1", birthDate: "1971/02/10", completedAt: "01/20" },
  { id: "emp-2", name: "受検者 2", birthDate: "1971/02/10" },
  { id: "emp-3", name: "受検者 3", birthDate: "1971/02/10" },
  { id: "emp-4", name: "受検者 4", birthDate: "1971/02/10" },
  { id: "emp-5", name: "受検者 5", birthDate: "1971/02/10" },
  { id: "emp-6", name: "受検者 6", birthDate: "1971/02/10" },
];

export const highStressEmployees: Employee[] = [
  {
    id: "hs-1",
    name: "高ストレス者A 1",
    birthDate: "1980/01/01",
    isHighStress: true,
    requestsInterview: true,
  },
  {
    id: "hs-2",
    name: "高ストレス者A 2",
    birthDate: "1980/01/01",
    isHighStress: true,
    requestsInterview: true,
  },
  {
    id: "hs-3",
    name: "高ストレス者A 3",
    birthDate: "1980/01/01",
    isHighStress: true,
    requestsInterview: true,
  },
  {
    id: "hs-4",
    name: "高ストレス者B1",
    birthDate: "1980/01/01",
    completedAt: "01/25",
    isHighStress: true,
  },
  { id: "hs-5", name: "受検者 1", birthDate: "1971/02/10" },
  { id: "hs-6", name: "受検者 2", birthDate: "1971/02/10" },
];
