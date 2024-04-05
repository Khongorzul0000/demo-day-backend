import { createUser, registerForVolunteer, signInUser } from "@/service/user-service";
import { Prisma } from "@prisma/client";
export const userMutations = {
  createUser: (_: unknown, { input }: { input: Prisma.UserCreateInput }) => createUser(input),
  signInUser: (_: unknown, { input }: { input: { username: string; password: string } }) => signInUser(input),
  registerForVolunteer: (_: unknown, { volunteerId, userId }: { volunteerId: string; userId: string }) => registerForVolunteer(userId, volunteerId),
};
