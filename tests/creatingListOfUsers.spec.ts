import { test, expect } from '@playwright/test';
import { fa, faker } from '@faker-js/faker';
import { z } from 'zod';
import { postAPI, getAPI, putAPI, deleteAPI ,createRandomUser, createMultipleUserJson} from '../utils/apiCallHelper';
test.describe('Create List of Users API tests', () => {
    const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    
    const expectedResponseSchemaZod = z.object({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.literal("ok")
    })
    test('create list of users', async ({ request }) => {
        const createListOfUsersRequestBody = createMultipleUserJson(2);
        await postAPI(request, `${baseURL}/user/createWithArray`, createListOfUsersRequestBody, 200, expectedResponseSchemaZod, 5);
    })
});