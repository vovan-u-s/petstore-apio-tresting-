import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { z } from 'zod';
import { getAPI, postAPI, deleteAPI } from '../utils/apiCallHelper';
test.describe('Login and Logout API tests', () => {
    const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    
    const username = faker.internet.userName();
    const password = faker.internet.password();
    
    const requestCreateUserBodySchema = {
        id: faker.number.int({ min: 1, max: 10000 }),
        username: username,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: password,
        phone: faker.phone.number(),
        userStatus: faker.number.int({ min: 0, max: 1 })
    };
    
    const responseCreateUserSchemaZod = z.object({
        code: z.number(),
        type: z.string(),
        message: z.string()
    });
    
    const responseGetLoginUserSchemaZod = z.object({
        code: z.number(),
        type: z.string(),
        message: z.string()
    });
    
    const responseGetLogoutUserSchemaZod = z.object({
        code: z.number(),
        type: z.string(),
        message: z.string()
    });
    
    const deleteUserResponseSchemaZod = z.object({
        code: z.number(),
        type: z.string(),
        message: z.string()
    });


    test.beforeEach(async ({ request }) => {
        await postAPI(request, `${baseURL}/user`, requestCreateUserBodySchema, 200, responseCreateUserSchemaZod);
    });


    test('logs and logout user into the system', async ({ request }) => {
        await getAPI(request, `${baseURL}/user/login`, 200, responseGetLoginUserSchemaZod, { username: username, password: password });
    });
    
    test('logs out current logged in user session', async ({ request }) => {
        await getAPI(request, `${baseURL}/user/logout`, 200, responseGetLogoutUserSchemaZod);
    });
    
    test.afterEach('delete user after tests', async ({ request }) => {
        await deleteAPI(request, `${baseURL}/user/${username}`, 200, deleteUserResponseSchemaZod);
    });
})