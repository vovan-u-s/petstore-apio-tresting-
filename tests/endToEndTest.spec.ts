import { test } from '@playwright/test';
import { z } from 'zod';
import { postAPI, getAPI, deleteAPI } from '../utils/apiCallHelper';

test.describe('End to End API tests', () => {
    const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

         const requestBody = {
            id: 1380,
            petId: 0,
            quantity: 2,
            shipDate: "2025-10-09T02:11:39.913Z",
            status: "delivered",
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
        await getAPI(request, `${baseURL}/store/order/1380`, 200, expectedGetOrderResponseSchemaZod);
        await deleteAPI(request, `${baseURL}/store/order/1380`, 200, expectedDeleteOrderResponseSchemaZod);
    })
})