import { test, expect } from '@playwright/test';
import { fa, faker } from '@faker-js/faker';
import { z } from 'zod';
import { postAPI, getAPI, putAPI, deleteAPI } from '../utils/apiCallHelper';
test.describe('Create List of Users API tests', () => {
    const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const createListOfUsersRequestBody =
        [
            {
                id: 7463,
                username: "string",
                firstName: "string",
                lastName: "string",
                email: "string",
                password: "string",
                phone: "string",
                userStatus: 7789
            },
            {
                id: 1570,
                username: "string",
                firstName: "string",
                lastName: "string",
                email: "string",
                password: "string",
                phone: "string",
                userStatus: 3369
            }
        ]
    const expectedResponseSchemaZod = z.object({
        code: z.literal(200),
        type: z.literal("unknown"), 
        message: z.literal("ok")
    })
    test('create list of users', async ({ request }) => {
        await postAPI(request, `${baseURL}/user/createWithArray`, createListOfUsersRequestBody, 200, expectedResponseSchemaZod, 5);
    })
});