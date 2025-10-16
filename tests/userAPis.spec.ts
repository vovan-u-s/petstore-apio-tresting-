import { test, expect } from '@playwright/test';
import { fa, faker, Faker } from '@faker-js/faker';
import { z } from 'zod';
import { env } from 'process';
import { getAPI, postAPI, deleteAPI, putAPI } from '../utils/apiCallHelper';
import { APIRequestContext } from '@playwright/test';
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

    const expectedCreateResponseSchemaZod = z.object({
        "code": z.literal(200),
        "type": z.literal("unknown"),
        "message": z.literal(createUserRequestBody.id.toString())
    })
    const username = createUserRequestBody.username;
    const expectedGetUserResponseSchemaZod = z.object({

        "username": z.literal(username),
        "firstName": z.string(),
        "lastName": z.string(),
        "email": z.string().email(),
        "password": z.string(),
        "phone": z.string(),
        "userStatus": z.number()
    })
    // make the putt schema 
    const expectedPutAPIResponseSchemaZod = z.object({
        "code": z.literal(200),
        "type": z.literal("unknown"),
        "message": z.literal(createUserRequestBody.id.toString())
    })

    
    const expectedDeleteUserResponseSchemaZod = z.object({
       
        "type": z.literal("unknown"),
        "message": z.literal(username)
    })
    test('end to end user API test', async ({ request }) => {
        await postAPI(request, `${baseURL}/user`, createUserRequestBody, 200, expectedCreateResponseSchemaZod);
        await getAPI(request, `${baseURL}/user/${username}`, 200, expectedGetUserResponseSchemaZod);
        await putAPI(request, `${baseURL}/user/${username}`, createUserRequestBody, 200, expectedPutAPIResponseSchemaZod);
        await deleteAPI(request, `${baseURL}/user/${username}`, 200, expectedDeleteUserResponseSchemaZod);
    })

})