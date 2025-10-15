import { test, expect } from '@playwright/test';
import { fa, faker, Faker } from '@faker-js/faker';
import { z } from 'zod';
import { env } from 'process';

const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
test.describe('User API tests', () => { 

    test('create a new user', async ({ request }) => {
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
        const createUserResponse = await request.post(`${baseURL}/user`, {
            data: createUserRequestBody
        })
        expect(createUserResponse.status()).toBe(200);
        const expectedResponseSchemaZod = z.object({
            "code": z.literal(200),
            "type": z.literal("unknown"),
            "message": z.literal(createUserRequestBody.id.toString())
        })
        const actualResponseBody = await createUserResponse.json();
        expectedResponseSchemaZod.parse(actualResponseBody);
    })
    test('get user by username', async ({ request }) => {
        const username = "TestUserNameSalih123";
        const getUserResponse = await request.get(`${baseURL}/user/${username}`);
        expect(getUserResponse.status()).toBe(200);
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
        const actualGetUserResponseBody = await getUserResponse.json();
        expectedGetUserResponseSchemaZod.parse(actualGetUserResponseBody);

    })
})