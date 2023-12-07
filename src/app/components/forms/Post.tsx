"use client"

import { Button } from "@/components/ui/button"
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
import { PostValidation } from "@/lib/validations/post";
import { ChangeEvent, useState } from "react";
import { updateUser } from "@/lib/actions/user.actions";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/actions/post.actions";


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



function Post({ userId }: { userId: string }) {
    const router = useRouter();
    const pathname = usePathname();
  
    
  
    const form = useForm({
      resolver: zodResolver(PostValidation),
      defaultValues: {
      post: '',
      accountId: userId,
  
      },
    })
    const onSubmit = async (values: z.infer<typeof PostValidation>) => {
      await createPost({
        text: values.post,
        author: userId,
        path: pathname,
      });
  
      router.push("/");
    };

  return (

    <Form {...form}>
    <form
      className='mt-10 flex flex-col justify-start gap-10'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormField
        control={form.control}
        name='post'
        render={({ field }) => (
          <FormItem className='flex w-full flex-col gap-3'>
            <FormLabel className='text-base-semibold text-light-2'>
              Content
            </FormLabel>
            <FormControl className='no-focus border border-dark-4 bg-black/50 text-light-1'>
              <Textarea rows={15} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type='submit' className='bg-black'>
        Post Thread
      </Button>
    </form>
  </Form>
);
}

export default Post