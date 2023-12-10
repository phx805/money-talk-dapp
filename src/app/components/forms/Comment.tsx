"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";


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
}

const Comment = ({ postId, currentUserImg, currentUserId }: Props) => {
const pathname = usePathname();

const form = useForm({
  resolver: zodResolver(CommentValidation),
  defaultValues: {
  post: '',

  },
})
const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
  // const speakPost = await fetchPostById(postId);
  // console.log(speakPost.author.wallet);

  await addCommentToPost(
    postId,
    values.post,
    JSON.parse(currentUserId),
    pathname
  );

  form.reset();
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