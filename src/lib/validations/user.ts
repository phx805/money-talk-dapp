import * as z from 'zod';

export const Uservalidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string(),
    username: z.string(),
    wallet: z.string(),
});