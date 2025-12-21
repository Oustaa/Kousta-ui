import { users } from "./data";

export const getUsers = async ({
  limit,
  page,
  searchTerm,
}: {
  page?: number;
  limit?: number;
  searchTerm?: string;
}) => {
  if (!limit && page) limit = 20;
  else if (!page && limit) page = 1;
  else if (!limit && !page) return { users, total: users.length };

  const currentLimit = Number(limit);
  const currentPage = Number(page);

  let filtered = users;
  if (searchTerm && searchTerm.trim() !== "") {
    const term = searchTerm.toLowerCase();
    filtered = users.filter((u) =>
      Object.values(u).some((value) =>
        String(value).toLowerCase().includes(term),
      ),
    );
  }

  const total = filtered.length;

  const offset = currentLimit * (currentPage - 1);
  const paginated = filtered.slice(offset, offset + currentLimit);
  const totalPages = Math.ceil(total / currentLimit);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        users: paginated,
        total,
        totalPages,
      });
    }, 2000);
  });
};
