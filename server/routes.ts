import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { randomUUID } from "crypto";
import z from "zod";


interface User{
    id: string,
    name: string
}

const users:User[] = []

export const routes: FastifyPluginAsyncZod = async (app) => {
    app.post('/users', {
        schema:{
            tags: ['users'],
            description: 'create user',
            //name of the operation, this name will be apperated at the api.ts type on the front 
            operationId: 'createUser',
            body: z.object({
                id: z.string(),
                name: z.string()
            }),
            response: {
                201: z.object({})
            }
        }
    }, async (request, reply) => {
        const { name } = request.body
        users.push({
            id: randomUUID(),
            name,
        })

        return reply.code(201).send({})
    })

    app.get('/users/:id', {
        schema: {
            tags: ['users'],
            operationId: 'getUser',
            description: 'get user by id',
            // type the route parameters to get the user
            params: z.object({
                id: z.string()
            }),
            //data format if the status code was 200
            response: {
                200: z.object({
                    id: z.string(),
                    name: z.string()
                }),
                404: z.object({
                    message: z.string()
                })
            }
        }
    },async (request, reply) => {
        const { id } = request.params
        const user = users.find(user => user.id === id)
        if (!user) {
            return reply.status(404).send({
                message: 'user not found'
            })
        }
        return user
    })


    app.get('/users', {
        schema: {
            tags: ['users'],
            operationId: 'getUsers',
            description: 'list users',
            //data format if the status code was 200
            response: {
                200: z.array(z.object({
                    id: z.string(),
                    name: z.string()
                }))
            }
        }
    }, () => {
        return users
    })
}