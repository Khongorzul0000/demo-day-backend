import { prisma } from "@/utils/prisma";
import { Prisma, VolunteerCategory } from "@prisma/client";
import { GraphQLError } from "graphql";

export const getVolunteers = async () => {
  try {
    const results = await prisma.volunteer.findMany({
      include: {
        leader: true,
        attendees: { include: { user: true, volunteer: true } },
      },
    });
    const volunteers = [];
    for (const row of results) {
      const volunteer = {
        ...row,
        attendees: row.attendees.map((attendee) => attendee.user),
      };
      volunteers.push(volunteer);
    }
    return volunteers;
  } catch (error) {
    console.error(error);
    throw new GraphQLError("error fetching");
  }
};

export const getVolunteer = async (id: string) => {
  try {
    const result = await prisma.volunteer.findUnique({ where: { id } });
    return result;
  } catch (error) {
    console.error(error);
    throw new GraphQLError("error fetching");
  }
};

export const getVolunteersByCategory = async (category: VolunteerCategory) => {
  try {
    const volunteers = await prisma.volunteer.findMany({ where: { category } });
    console.log(volunteers);
    return volunteers;
  } catch (error) {
    console.error("category:", error);
    throw new Error("category");
  }
};

export const createVolunteer = async (input: Prisma.VolunteerUncheckedCreateInput & { leaderId: string }) => {
  const data: Prisma.VolunteerCreateInput = {
    name: input.name,
    where: input.where,
    when: input.when,
    description: input.description,
    neededPeople: input.neededPeople,
    category: input.category,
    img: input.img,
    leader: {
      connect: {
        id: input.leaderId,
      },
    },
  };
  try {
    const result = await prisma.volunteer.create({
      data,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw new GraphQLError("error creating");
  }
};

export const updateVolunteer = async (input: Prisma.VolunteerUpdateInput, id: string) => {
  try {
    const result = await prisma.volunteer.update({ where: { id }, data: input });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating volunteer");
  }
};

export const deleteVolunteer = async (id: string) => {
  try {
    const volunteerAttendees = await prisma.volunteerAttendee.findMany({
      where: { volunteerId: id },
    });
    await Promise.all(
      volunteerAttendees.map(async (attendee) => {
        await prisma.volunteerAttendee.delete({ where: { id: attendee.id } });
      })
    );
    const result = await prisma.volunteer.delete({ where: { id } });

    return result;
  } catch (error) {
    console.error(error);
    throw new GraphQLError("Error deleting volunteer or associated records.");
  }
};