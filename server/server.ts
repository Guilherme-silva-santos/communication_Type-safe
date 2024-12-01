import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import fastifyCors from "@fastify/cors";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import fastify from "fastify";

import { routes } from "./routes";


const app = fastify().withTypeProvider<ZodTypeProvider>();
// validation 
app.setValidatorCompiler(validatorCompiler)
// data muttation 
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors,{
    origin: '*'
})

// config swagger
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "typed-full-stack",
            version: "1.0.0",
        },
    },
    transform: jsonSchemaTransform
})

// rote that swagger ui will be available
app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.register(routes)

app.listen({port: 3000}).then(() => {
  console.log("Server is running on port 3000");
});

app.ready().then(() => {
// generate swagger.json, this file is the swagger doc but in json format
  const spec = app.swagger();
// write the documentation at json
  writeFile(resolve(__dirname, 'swagger.json'), JSON.stringify(spec, null, 2), 'utf-8')
})