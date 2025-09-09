import express, { Application, Request, Response } from "express";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

const app: Application = express();
const port = 4550;

app.use(express.json());

let users: User[] = [
  {
    id: 1,
    firstName: "Vanilla",
    lastName: "Caramel",
    email: "icecream@example.com",
    password: "erouirgf79974eyf89fy4389",
  },
];

app.get("/user", (req: Request, res: Response) => {
  res.status(200).json({ message: "Users gotten successfully", data: users });
});

app.post("/createUser", (req: Request<User>, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const checkIfUsersExists = users.findIndex((e) => e.email === email);

  if (checkIfUsersExists !== -1) {
    res.status(400).json({ message: "User already exists" });
  }

  if (firstName && lastName && email && password) {
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      password,
    };
    users.push(newUser);
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } else {
    return res.status(400).json({ message: "All fields are required" });
  }
});

app.patch("/updateUser", (req: Request<User>, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const findUser = users.find((e) => e.email === email);

  if (findUser) {
    if (firstName) findUser.firstName = firstName;
    if (lastName) findUser.lastName = lastName;
    if (password) findUser.password = password;

    res
      .status(200)
      .json({ message: "User updated succesfully", data: findUser });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

app.delete("/deleteUser", (req: Request<User>, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const findUserToDelete = users.find((e) => e.email === email);

  if (!findUserToDelete) {
    res.status(404).json({ message: "User Not found" });
  }

  users = users.filter((e) => e.email === email);

  res.status(200).json({ message: "User deleted successfully", data: users });
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route does not exist" });
});

app.listen(port, () => {
  console.log(`Server is listening to http://localhost:${port}`);
});
