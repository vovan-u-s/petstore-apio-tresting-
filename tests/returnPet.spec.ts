import { test } from '@playwright/test';
import { z } from 'zod';
import { getAPI } from '../utils/apiCallHelper';
   const expectedInventoryResponseSchema = z
    .record(z.string(), z.number())
    .refine((data) => Object.keys(data).length === 14, {
      message: "Response must have exactly 14 keys",
    });
test.describe('Return Pet API tests', () => {
    const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

    test('validating of schema length', async ({ request }) => {
        await getAPI(request, `${baseURL}/store/inventory`, 200, expectedInventoryResponseSchema, 5);
       
    })
})