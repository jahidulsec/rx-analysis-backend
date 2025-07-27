import inquirer from "inquirer";
import { hashPassword } from "./utils/password";
import { db, pool } from "./db/db";
import { userTable } from "./db/schema";

async function main() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter your name:",
    },
    {
      type: "input",
      name: "mobile",
      message: "Enter your mobile:",
    },
    {
      type: "input",
      name: "username",
      message: "Enter your username:",
    },
    {
      type: "password",
      name: "password",
      message: "Enter your password:",
      mask: "*",
    },
    {
      type: "list",
      name: "role",
      message: "Select your role:",
      choices: ["superadmin", "chq-admin", "mio"],
    },
  ]);

  // create admin user
  await db.insert(userTable).values({
    username: answers.username,
    fullName: answers.name,
    password: await hashPassword(answers.password),
    role: answers.role,
  });

  console.log(
    `Welcome, ${answers.name}! You are signed up as ${answers.role}.`
  );
}

main()
  .then(async () => {
    await pool.end(); // ✅ properly closes connections
  })
  .catch(async (e) => {
    console.error(e);
    await pool.end();
  })
  .finally(() => {
    process.exit(1);
  });
