import { getVolunteer, getVolunteers, getVolunteersByCategory } from "@/service/volunteer-service";
import { VolunteerCategory } from "@prisma/client";
export const volunteerQueries = {
  getVolunteers: () => getVolunteers(),
  getVolunteer: (_: unknown, { id }: { id: string }) => getVolunteer(id),
  getVolunteersByCategory: (_: unknown, { category }: { category: VolunteerCategory }) => getVolunteersByCategory(category),
};
