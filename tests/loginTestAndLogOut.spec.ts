import { test, expect } from '@playwright/test';
import { fa, faker, Faker } from '@faker-js/faker';
import { z } from 'zod';
import { env } from 'process';
import { getAPI, postAPI, deleteAPI, putAPI } from '../utils/apiCallHelper';

const baseURL = `${process.env.BASE_URL}`;

const responseGetUserSchemaZod = z.object({
    code: z.number(),
    type: z.string(),
    message: z.string()
});

test.beforeEach(async ({ page }) => {
const requestCreateUserBodySchema = {
    id: 12312,
    username: "TestUserNameSalih123",
    firstName: "randomFirstName",
    lastName: "randomLastName",
    email: "random@example.com",
    password: "Test1234!",
    phone: "123-456-7890",
    userStatus: 0
};
const responseCreateUserSchemaZod = z.object({
    code: z.number(),
    type: z.string(),
    message: z.string()
});
test('create a new user', async ({ page }) => {
await postAPI(page.request, `${baseURL}/user`, requestCreateUserBodySchema, 200, responseCreateUserSchemaZod, 5);
});
test.describe('Login and Logout API tests', () => {
})
test('logs user into the system', async ({ request }) => {
 await postAPI(request, `${baseURL}/user/login`, { username: "TestUserNameSalih123", password: "Test1234!" }, 200, responseGetUserSchemaZod, 5);
})
})