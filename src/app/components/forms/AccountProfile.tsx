"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Uservalidation } from "@/lib/validations/user";
import { ChangeEvent, useState } from "react";
import { UserProfile } from "@clerk/nextjs"
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";



interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: String;
        wallet: string;
        image: string;
    };
    btnTitle: string;
}
const AccountProfile = ({ user, btnTitle }:Props) => {
  
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const pathname = usePathname();
  
  const form = useForm({
    resolver: zodResolver(Uservalidation),
    defaultValues: {
      profile_photo: user?.image ? user.image : "",
      name: user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      wallet: user?.wallet ? user.wallet : "",
    },
  })

  const handleImage = (e: ChangeEvent<HTMLInputElement>, feildChange: (valule: string) => void) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString();
        feildChange(imageDataUrl);
      }

      fileReader.readAsDataURL(file);
      
    }
  }

  const onSubmit = async (values: z.infer<typeof Uservalidation>) => {
    console.log(values)
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if(hasImageChanged) {
      const imgRes = await startUpload(files)

      if(imgRes && imgRes[0].fileUrl) {
        values.profile_photo = imgRes[0].fileUrl;
      }
    }
    await updateUser({
      name: values.name,
      path: pathname,
      username: values.username,
      userId: user.id,
      wallet: values.wallet,
      image: values.profile_photo,
    });

  }
  return (
    
    <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col justify-start gap-10">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className=" flex h-24 w-24 items-center justify-center rounded-full bg-purple-700">
                <Image
                  
                  src={field.value}
                  alt="Profile photo"
                  width={96}
                  height={96}
                  priority
                  className="rounded-full object-contain" />

              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input 
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="cursor-poniter border-none bg-transparent outline-none file:text-purple-200"
                  onChange={(e) => handleImage(e, field.onChange)} />
              </FormControl>
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel className=" text-base-semibold text-purple-200">
                name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  className="border border-dark-4 bg-dark-3 text-light-1"
               />
              </FormControl>
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel className=" text-base-semibold text-purple-200">
                Username
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  className="border border-dark-4 bg-dark-3 text-light-1"
               />
              </FormControl>
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="wallet"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel className=" text-base-semibold text-purple-200">
                wallet address
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  className="border border-dark-4 bg-dark-3 text-light-1"
               />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
};
export default AccountProfile