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
import { UserValidation } from "@/lib/validations/user";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";


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
const AccountProfile = ({ user, btnTitle }: Props) => {

  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");

  

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: '',
      name: '',
      username: '',
      wallet: '',

    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

     
    }
    
    await updateUser({
      name: values.name,
      path: pathname,
      username: values.username,
      userId: user.id,
      wallet: values.wallet,
      image: values.profile_photo,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || '';
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

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
              {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile_icon'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                )}

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
                  type="text"
                  className="border border-dark-4 bg-dark-3 text-light-1"
                  {...field}
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
                  type="text"
                  className="border border-dark-4 bg-dark-3 text-light-1"
                  {...field}
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
                  type="text"
                  className="border border-dark-4 bg-dark-3 text-light-1"
                  {...field}
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