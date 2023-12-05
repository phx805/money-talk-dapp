import * as z from 'zod';

export const Uservalidation = z.object({
    profile_photo: z.string().url().nonempty(),
    username: z.string(),
    wallet: z.string(),
});