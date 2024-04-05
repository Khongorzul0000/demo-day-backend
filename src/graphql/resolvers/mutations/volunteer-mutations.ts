import { createVolunteer, deleteVolunteer, updateVolunteer } from "@/service/volunteer-service";
import { Prisma } from "@prisma/client";
export const volunteerMutations = {
  createVolunteer: (_: unknown, { input }: { input: Prisma.VolunteerUncheckedCreateInput & { leaderId: string } }) => createVolunteer(input),
  deleteVolunteer: (_: unknown, { id }: { id: string }) => deleteVolunteer(id),
  updateVolunteer: (_: unknown, { id, input }: { id: string; input: Prisma.VolunteerUpdateInput }) => updateVolunteer(input, id),
};
