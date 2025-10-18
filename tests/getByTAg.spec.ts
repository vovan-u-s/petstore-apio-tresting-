import { test, expect } from '@playwright/test';
import { fa, faker, Faker } from '@faker-js/faker';
import { z } from 'zod';
import { env } from 'process';
import { getAPI, postAPI, deleteAPI, putAPI } from '../utils/apiCallHelper';
import { get } from 'http';
test.describe('Get Pet by Tags API tests', () => {
    const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    
    const FindByStatusSchema = z.array(
    z.object({
        id: z.number(),
        category: z.object({
            id: z.number(),
            name: z.string()
        }),
        name: z.string(),
        photoUrls: z.array(z.string()),
        tags: z.array(
            z.object({
                id: z.number(),
                name: z.string()
            })
        ),
        status: z.enum(['available', 'pending', 'sold'])
    })
);

    test('get pet by tags', async ({ request }) => {            
        await getAPI(request, `${baseURL}/pet/findByTags`, 200, FindByStatusSchema, {tags: 'tag1'}, 5);
    })
})