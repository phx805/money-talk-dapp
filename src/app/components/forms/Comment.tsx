"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ethers } from "ethers";
import mAbi from "../../../lib/money.json"


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CommentValidation } from "@/lib/validations/post";
import { addCommentToPost, fetchPostById } from "@/lib/actions/post.actions";

// import { CommentValidation } from "@/lib/validations/thread";
// import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
  postId: string;
  currentUserImg: string;
  currentUserId: string;
  wallet: string;
}

const Comment = ({ postId, currentUserImg, currentUserId, wallet }: Props) => {
const pathname = usePathname();
const CA = '0x6c0375B388d9EeAF2e43a28411342969B28f23Ee'
const getContract = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // A connection to the Ethereum network
      var signer = await provider.getSigner(); // Holds your private key and can sign things
      const Contract = new ethers.Contract(CA, mAbi, signer);
      return Contract;
    } else {
      alert("No wallet detected");
    }
  };

const form = useForm({
  resolver: zodResolver(CommentValidation),
  defaultValues: {
  post: '',

  },
})
  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    try {
      const mCt = await getContract();
      console.log(mCt);
      console.log(wallet)
      var tx = await mCt.makeComment(wallet, {
        value: 7500000000000000n
      });
      await tx.wait();
      await addCommentToPost(
        postId,
        values.post,
        JSON.parse(currentUserId),
        pathname
      );

      form.reset();
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <Form {...form}>
    <form
      className='comment-form'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormField
        control={form.control}
        name='post'
        render={({ field }) => (
          <FormItem className='flex w-full gap-3'>
            <FormLabel className='text-base-semibold text-light-2'>
            <Image
                  src={currentUserImg}
                  alt='current_user'
                  width={50}
                  height={50}
                  className= " text-white rounded-full object-cover"
                />
            </FormLabel>
            <FormControl className='no-focus border border-dark-4 bg-black/50 text-light-1'>
            <Input
                  type='text'
                  {...field}
                  placeholder='Remark...'
                  className='no-focus text-light-1 outline-none'
                />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type='submit' className='hover:bg-violet-500/50 bg-violet-700'>
        speak
      </Button>
    </form>
  </Form>
  );
        }

export default Comment;