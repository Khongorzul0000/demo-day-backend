import { prisma } from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import { getVolunteer } from "./volunteer-service";

const saltRounds = 10;

export const getUsers = async () => {
  try {
    const result = prisma.user.findMany();
    return result;
  } catch (error) {
    console.log(error);
    throw new GraphQLError("error fetching");
  }
};

export const getUser = async (id: string) => {
  try {
    const result = await prisma.user.findUnique({ where: { id } });
    return result;
  } catch (error) {
    console.log(error);
    throw new GraphQLError("error fetching");
  }
};

export const createUser = async (input: Prisma.UserCreateInput) => {
  try {
    let hashedPassword: string | undefined = undefined;
    if (input.password !== null && input.password !== undefined) {
      hashedPassword = await bcrypt.hash(input.password, saltRounds);
    }
    const result = await prisma.user.create({
      data: {
        username: input.username,
        email: input.email,
        password: hashedPassword,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new GraphQLError("Error creating user");
  }
};

export const signInUser = async (input: { username: string; password: string }) => {
  const { username, password } = input;
  const user = await prisma.user.findFirst({ where: { username } });
  if (!user) {
    throw new GraphQLError("User not found");
  }
  if (!user.password) {
    throw new GraphQLError("User does not have a password set");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new GraphQLError("Invalid password");
  }
  return user;
};

export const registerForVolunteer = async (userId: string, volunteerId: string) => {
  try {
    let vol = await getVolunteer(volunteerId);
    if (!vol) {
      throw new GraphQLError("tiim vol alga");
    }
    await prisma.volunteerAttendee.create({ data: { user: { connect: { id: userId } }, volunteer: { connect: { id: volunteerId } } } });
    vol = await getVolunteer(volunteerId);
    return vol;
  } catch (error) {
    console.log(error);
    throw new GraphQLError("Error register for volunteer");
  }
};
