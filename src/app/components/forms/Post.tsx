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
import { ethers } from "ethers";
import mAbi from "../../../lib/money.json"


interface Props {
  userId: string;
}



function Post({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const CA = '0x6c0375B388d9EeAF2e43a28411342969B28f23Ee'
  const getContract = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum); // A connection to the Ethereum network
      var signer = await provider.getSigner(); // Holds your private key and can sign things
      const Contract = new ethers.Contract(CA, mAbi, signer);
      return Contract;
    } else {
      alert("No wallet detected");
    }
  };



  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      post: '',
      accountId: userId,

    },
  })
  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    try {
      const mCt = await getContract();
      console.log(mCt);
      var tx = await mCt.createPost({
        value: 75000000000000000n
      });
      await tx.wait();
      await createPost({
        text: values.post,
        author: userId,
        path: pathname,
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }

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
              <FormLabel className='text-xl text-base-semibold text-white'>
                Lets talk about it...
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 text-light-1'>
                <Textarea className="bg-dark-4" placeholder="Discussion..."
                  rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='hover:bg-violet-500/50 bg-violet-700'>
          Speak
        </Button>
      </form>
    </Form>
  );
}


export default Post