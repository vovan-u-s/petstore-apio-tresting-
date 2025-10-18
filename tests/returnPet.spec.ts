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

    test('return pet', async ({ request }) => {
        await getAPI(request, `${baseURL}/pet/findByStatus`, 200, FindByStatusSchema, { status: 'available' }, 5);
    })
})