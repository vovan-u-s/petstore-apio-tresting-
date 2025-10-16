import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { z } from 'zod';

test.describe('Add New Pet API tests', () => {
    // Construct the base URL from environment variables
    const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

    const createPetRequestBody = {
        id: 4521,
        name: "doggie",
        photoUrls: ["string", "string"],
        category: {
            id: 3072,
            name: "string"
        },
        tags: [
            { id: 6330, name: "string" },
            { id: 5622, name: "string" }
        ],
        status: "pending"
    };

    test('create a new pet', async ({ request }) => {
        const createPetResponse = await request.post(`${baseURL}/pet`, {
            data: createPetRequestBody
        });

        expect(createPetResponse.status()).toBe(200);

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

        const body = await createPetResponse.json();
        const parsed = expectedResponseSchemaZod.parse(body);


    });
}); 