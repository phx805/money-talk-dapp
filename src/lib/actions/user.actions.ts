"use server"

import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache";


interface Params {
  userId: string;
  username: string;
  name: string;
  wallet: string;
  image: string;
  path: string;
}



export async function updateUser({
  userId,
  username,
  name,
  wallet,
  image,
  path,
}: Params): Promise<void> { 
  
   try {
    connectToDB();
     await User.findOneAndUpdate(
      { id: userId },
      { 
        username: username.toLowerCase(),
        name,
        wallet,
        image,
        onboarded: true,
        },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
    
    }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User
    .findOne({ id: userId})

  } catch (error: any) {
  throw new Error(`failed to fetch user: ${error.message}`)
  }
}