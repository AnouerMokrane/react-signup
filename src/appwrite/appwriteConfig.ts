import { Client, Account, ID } from "appwrite";

type UserInfo = {
  email: string;
  password: string;
  username: string;
};

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);

export const signup = async (userInfo: UserInfo) => {
  try {
    const user = await account.create(
      ID.unique(),
      userInfo.email,
      userInfo.password,
      userInfo.username
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (userInfo: { email: string; password: string }) => {
  try {
    const session = await account.createEmailSession(
      userInfo.email,
      userInfo.password
    );
    const user = account.get();
    return user;
  } catch (error) {
    console.log(error);
  }
};
