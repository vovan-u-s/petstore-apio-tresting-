import { test, expect } from '@playwright/test';
import { fa, faker, Faker } from '@faker-js/faker';
import { z } from 'zod';
import { env } from 'process';
import { getAPI, postAPI, deleteAPI, putAPI } from '../utils/apiCallHelper';
test.describe('Add New Pet API tests', () => {
    // Construct the base URL from environment variables
    const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

    const createPetRequestBody = {
        id: 4521,
        name: faker.animal.type(),
        photoUrls: [faker.internet.url(), faker.internet.url()],
        category: {
            id: 3072,
            name: faker.animal.type()
        },
        tags: [
            { id: 6330, name: faker.animal.type() },
            { id: 5622, name: faker.animal.type() }
        ],
        status: "pending"
    };
    const expectedResponseSchemaZod = z.object({
        id: z.number(),
        name: z.string(),
        photoUrls: z.array(z.string().url()),   
        category: z.object({
            id: z.number(),
            name: z.string()
        }), 
        tags: z.array(z.object({
            id: z.number(),
            name: z.string()                
        })),
        status: z.literal("pending")
    });
     const createPutPetRequestBody = {
        id: 4521,
        name: faker.animal.type(),
        photoUrls: [faker.internet.url(), faker.internet.url()],
        category: {
            id: 3072,
            name: faker.animal.type()
        },
        tags: [
            { id: 6330, name: faker.animal.type() },
            { id: 5622, name: faker.animal.type() }
        ],
        status: "done"  
    };
     const expectedPutAPIResponseSchemaZod = z.object({
        id: z.number(),
        name: z.string(),
        photoUrls: z.array(z.string().url()),   
        category: z.object({    
            id: z.number(),
            name: z.string()
        }),
        tags: z.array(z.object({
            id: z.number(),
            name: z.string()
        })),
        status: z.literal("done")
    });
    test('create a new pet', async ({ request }) => {
        await postAPI(request, `${baseURL}/pet`, createPetRequestBody, 200, expectedResponseSchemaZod, 5);
        await getAPI(request, `${baseURL}/pet/${createPetRequestBody.id}`, 200, expectedResponseSchemaZod, 5);
        await putAPI(request, `${baseURL}/pet`, createPutPetRequestBody, 200, expectedResponseSchemaZod, 5);
        })
    });