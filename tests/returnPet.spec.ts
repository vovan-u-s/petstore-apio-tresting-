import { test } from '@playwright/test';
import { z } from 'zod';
import { getAPI } from '../utils/apiCallHelper';

test.describe('Return Pet API tests', () => {
    const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const FindByStatusSchema = z.array(
        z.object({
            id: z.number().int().positive(),
            category: z.object({
                id: z.number().int().positive(),
                name: z.string().regex(/^[a-zA-Z0-9\s\-_]+$/)
            }),
            name: z.string().regex(/^[a-zA-Z0-9\s\-_]+$/),
            photoUrls: z.array(
                z.string().regex(/^https?:\/\/.+/)
            ),
            tags: z.array(
                z.object({
                    id: z.number().int().positive(),
                    name: z.string().regex(/^[a-zA-Z0-9\s\-_]+$/)
                })
            ),
            status: z.enum(['available', 'pending', 'sold'])
        })
    );

    test('validating of schema length', async ({ request }) => {
        const response = await getAPI(request, `${baseURL}/store/inventory`, 200, z.record(z.number()), {}, 5);
        const inventory = response;
        const totalPets = Object.values(inventory).reduce((acc, curr) => acc + curr, 0);
        console.log(`Total number of pets in inventory: ${totalPets}`);
    })
})