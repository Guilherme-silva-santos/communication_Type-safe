import { defineConfig } from 'orval';


export default defineConfig({
    // api that front-end is conected 
    api: {
        // where the swagger doc is located
        input:'../server/swagger.json',
        // where the generated swagger doc will be saved
        output: {
            clean: true,
            target: './src/http/generated/api.ts',
            // use this to use fetch api istead of axios api
            httpClient: 'fetch',
            // to separate all of the types and methods based of api
            mode:'tags-split',
            client: 'react-query',
            baseUrl: 'http://localhost:3000',
        },
        // when we run "npm run generate:api" the orval will generate all of types about the api
        // and with the possibles retuns from the api
        // generate all of types based of the api
    },
})