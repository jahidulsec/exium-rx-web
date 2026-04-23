import "dotenv/config";
import inquirer from "inquirer";
import { hashPassword } from "@/utils/password";
import { db } from "@/config/db";

async function main() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "user_id",
      message: "Enter your User ID:",
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
      choices: ["superadmin", "mio", "rm", "zm", "sm", "gm"],
    },
  ]);

  // create admin user
  await db.user.create({
    data: {
      user_id: answers.user_id,
      password: await hashPassword(answers.password),
      role: answers.role,
    },
  });

  console.log(
    `Welcome, ${answers.user_id}! You are signed up as ${answers.role}.`,
  );
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
