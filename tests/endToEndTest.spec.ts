import { test } from '@playwright/test';
import { z } from 'zod';
import { postAPI, getAPI, deleteAPI } from '../utils/apiCallHelper';
import { faker } from '@faker-js/faker';

test.describe('End to End API tests', () => {
    const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

         const requestBody = {
            id: faker.number.int({ min: 1000, max: 9999 }),
            petId: faker.number.int({ min: 1000, max: 9999 }),
            quantity: faker.number.int({ min: 1, max: 10 }),
            shipDate: faker.date.recent().toISOString(),
            status: faker.helpers.arrayElement(['placed', 'approved', 'delivered']),
            complete: true
        };

    const requestCreateSchema = z.object({
        id: z.number(),
        petId: z.number(),
        quantity: z.number(),
        shipDate: z.string(),
        status: z.string(),
        complete: z.boolean()
    });

    const expectedGetOrderResponseSchemaZod = z.object({
        id: z.number(),
        petId: z.number(),
        quantity: z.number(),
        shipDate: z.string(),
        status: z.string(),
        complete: z.boolean()
    });

    const expectedDeleteOrderResponseSchemaZod = z.object({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.string()
    });

    test('create, get and delete an order', async ({ request }) => {
   
        await postAPI(request, `${baseURL}/store/order`, requestBody, 200, requestCreateSchema);
        await getAPI(request, `${baseURL}/store/order/${requestBody.id}`, 200, expectedGetOrderResponseSchemaZod);
        await deleteAPI(request, `${baseURL}/store/order/${requestBody.id}`, 200, expectedDeleteOrderResponseSchemaZod);
    })
})