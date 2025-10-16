import { test, expect } from '@playwright/test';
import { fa, faker } from '@faker-js/faker';
import { z } from 'zod';

test.describe('Add New Pet API tests', () => {
    // Construct the base URL from environment variables
    const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

    const createPetRequestBody = {
        id: 4521,
        name: "doggie",
        photoUrls: [faker.internet.url(), faker.internet.url()],
        category: {
            id: 3072,
            name: "string"
        },
        tags: [
            { id: 6330, name: faker.animal.type() },
            { id: 5622, name: faker.animal.type() }
        ],
        status: "pending"
    };
    const expectedResponseSchemaZod = z.object({
        id: z.number(),
        category: z.object({
            id: z.number(),
            name: z.string()
        }),
        name: z.string(),
        photoUrls: z.array(z.string()),
        tags: z.array(z.object({
            id: z.number(),
            name: z.string()
        })),
        status: z.string()
    });
    test('create a new pet', async ({ request }) => {
     await request.post(`${baseURL}/pet`, {
            data: createPetRequestBody
        })
    });
}); 