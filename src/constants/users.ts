type user = {
  userId: string;
  username: string;
};

export const users = [
  {
    userId: "1",
    username: "Jack",
  },
  {
    userId: "2",
    username: "Robert",
  },
  {
    userId: "4",
    username: "John",
  },
];

export default function getUsername(userId: string) {
  return users.find((user: user) => user.userId === userId)?.username || "";
}
