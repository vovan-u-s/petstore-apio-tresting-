import { test, expect } from '@playwright/test';
import { fa, faker, Faker } from '@faker-js/faker';
import { z } from 'zod';
import { env } from 'process';
import { getAPI, postAPI, deleteAPI, putAPI } from '../utils/apiCallHelper';
// Construct the base URL from environment variables
const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

test.describe('User API tests', () => {
    const createUserRequestBody = {
        "id": 12312,
        "username": "TestUserNameSalih123",
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "email": faker.internet.email(),
        "password": "Test1234!",
        "phone": faker.phone.number(),
        "userStatus": 0
    }
    test('create a new user', async ({ request }) => {
        const createUserResponse = await request.post(`${baseURL}/user`, {
            data: createUserRequestBody
        })
        const expectedResponseSchemaZod = z.object({
            "code": z.literal(200),
            "type": z.literal("unknown"),
            "message": z.literal(createUserRequestBody.id.toString())
        })
        await postAPI(request, `${baseURL}/user`, createUserRequestBody, 200, expectedResponseSchemaZod, 5);


    })
    test('get user by username', async ({ request }) => {
        const username = createUserRequestBody.username;
        const getUserResponse = await request.get(`${baseURL}/user/${username}`);
        const expectedGetUserResponseSchemaZod = z.object({
            "id": z.number(),
            "username": z.literal(username),
            "firstName": z.string(),
            "lastName": z.string(),
            "email": z.string().email(),
            "password": z.string(),
            "phone": z.string(),
            "userStatus": z.number()
        })
        await getAPI(request, `${baseURL}/user/${username}`, 200, expectedGetUserResponseSchemaZod, 5);

    })

    test('delete user by username', async ({ request }) => {
        const username = createUserRequestBody.username;
        const deleteUserResponse = await request.delete(`${baseURL}/user/${username}`);
        const expectedDeleteUserResponseSchemaZod = z.object({
            "code": z.literal(200),
            "type": z.literal("unknown"),
            "message": z.literal(username)
        })
        await deleteAPI(request, `${baseURL}/user/${username}`, 200, expectedDeleteUserResponseSchemaZod, 5);

    })

})