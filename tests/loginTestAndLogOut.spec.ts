import { test, expect } from '@playwright/test';
import { fa, faker, Faker } from '@faker-js/faker';
import { z } from 'zod';
import { env } from 'process';
import { getAPI, postAPI, deleteAPI, putAPI } from '../utils/apiCallHelper';
import { get } from 'http';
test.describe('Login and Logout API tests', () => {
    const baseURL = `${process.env.BASE_URL}`;
    const requestCreateUserBodySchema = z.object({
        id: z.number().optional(),
        username: z.string(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string(),
        phone: z.string().optional(),
        userStatus: z.number().optional()
    });
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


    test.beforeEach(async ({ page }) => {
        await postAPI(page.request, `${baseURL}/user`, requestCreateUserBodySchema, 200, responseCreateUserSchemaZod, 5);
    });


    test('logs and logout user into the system', async ({ request }) => {
        await getAPI(request, `${baseURL}/user/login?username=TestUserNameSalih123&password=Test1234!`, 200, responseGetLoginUserSchemaZod);
    })
    test('logs out current logged in user session', async ({ request }) => {
        await getAPI(request, `${baseURL}/user/logout`, 200, responseGetLogoutUserSchemaZod,);
    })
    test.afterEach('get user by username after logout', async ({ request }) => {
        await deleteAPI(request, `${baseURL}/user/TestUserNameSalih123`, 200, deleteUserResponseSchemaZod, 5);
    });
})