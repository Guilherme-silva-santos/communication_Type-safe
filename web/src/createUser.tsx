import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getGetUsersQueryKey, useCreateUser } from "./http/generated/users/users";


const createUserSchema = z.object({
  name: z.string().min(3, 'name must be at least 3 characters'),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

export function CreateUser() {
  const queryClient = useQueryClient();

  const { handleSubmit, register, reset, formState: {errors} } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  })

  // use the method at the api.ts to create a user using react-query
  const { mutateAsync: createUser } = useCreateUser()

  const handleCreateUser = async (data: CreateUserSchema) => {
    // take teh method create user pass name ass the input data and create a random id
    await createUser( {data: { name: data.name, id: Math.random().toString()}, } ) 
    // always create user make a post after make a get to take this users, this baset at the query name of the request
     await queryClient.invalidateQueries({
      queryKey: getGetUsersQueryKey(),
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleCreateUser)}>
        <input type="text" { ...register('name') } />
        {errors.name && <span>{errors.name.message}</span>}
        <button type="submit">create user</button>
    </form>
  )
}