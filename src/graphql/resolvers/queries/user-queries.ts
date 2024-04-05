import { getUser, getUsers } from "@/service/user-service";
export const userQueries = {
  getUsers: () => getUsers(),
  getUser: (_: unknown, { id }: { id: string }) => getUser(id),
};
