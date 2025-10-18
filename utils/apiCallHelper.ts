import { APIRequestContext, APIResponse } from '@playwright/test';
import { ZodTypeAny } from 'zod';
import { faker } from '@faker-js/faker';

/**
 * Explanation: Reusable GET method with retry logic
 * @param request -> Playwright's APIRequestContext comes from the test method
 * @param url -> the complete URL of the API endpoint
 * @param expectedStatusCode  -> expected status code of the API response
 * @param expectedSchema  -> expected schema of the API response
 * @param retryCount  -> number of times to retry the API call in case of failure (Optional, default is 5   )
 * @returns  -> the API response
 */
export async function getAPI(
    request: APIRequestContext,
    url: string,
    expectedStatusCode: number,
    expectedSchema: ZodTypeAny,
    parameters: Record<string, any> = {},
    retryCount: number = 5, // default retry count is 5, if not provided, OPTIONAL parameter
): Promise<APIResponse> {

    // retry logic because API is not working properly, it will retry 5 times before failing the test
    for (let i = 0; i < retryCount; i++) {
        // make the API call
        const response = await request.get(url, { params: parameters });

        // validate status code and schema if status code is expected, otherwise retry
        if (response.status() === expectedStatusCode) {
            const responseBodyJson = await response.json()
            expectedSchema.parse(responseBodyJson)
            return response;
        }
        console.log(`Attempt ${i + 1} failed. Retrying...`);
    }

    // if all retries was unsuccessful, throw an error
    throw new Error('Max retries reached. API call failed.');
}

/**
 * Explanation: Reusable POST method with retry logic
 * @param request -> Playwright's APIRequestContext comes from the test method
 * @param url -> the complete URL of the API endpoint
 * @param requestBody -> the request body to be sent in the API call
 * @param expectedStatusCode -> expected status code of the API response
 * @param expectedSchema -> expected schema of the API response
 * @param parameters -> query parameters to be sent in the API call (Optional)
 * @param retryCount -> number of times to retry the API call in case of failure (Optional, default is 5)
 * @returns -> the API response
 */
export async function postAPI(
    request: APIRequestContext,
    url: string,
    requestBody: unknown,
    expectedStatusCode: number,
    expectedSchema: ZodTypeAny,
    parameters: Record<string, any> = {},
    retryCount: number = 5, // default retry count is 5, if not provided, OPTIONAL parameter
): Promise<APIResponse> {

    // retry logic because API is not working properly, it will retry 5 times before failing the test
    for (let i = 0; i < retryCount; i++) {
        // make the API call
        const response = await request.post(url, { data: requestBody, params: parameters });

        // validate status code and schema if status code is expected, otherwise retry
        if (response.status() === expectedStatusCode) {
            const responseBodyJson = await response.json()
            expectedSchema.parse(responseBodyJson)
            return response;
        }
        console.log(`Attempt ${i + 1} failed. Retrying...`);
    }

    // if all retries was unsuccessful, throw an error
    throw new Error('Max retries reached. API call failed.');
}

/**
 * Explanation: Reusable PUT method with retry logic
 * @param request -> Playwright's APIRequestContext comes from the test method
 * @param url -> the complete URL of the API endpoint
 * @param requestBody -> the request body to be sent in the API call
 * @param expectedStatusCode -> expected status code of the API response
 * @param expectedSchema -> expected schema of the API response
 * @param retryCount -> number of times to retry the API call in case of failure (Optional, default is 5)
 * @returns -> the API response
 */
export async function putAPI(
    request: APIRequestContext,
    url: string,
    requestBody: unknown,
    expectedStatusCode: number,
    expectedSchema: ZodTypeAny,
    retryCount: number = 5, // default retry count is 5, if not provided, OPTIONAL parameter
): Promise<APIResponse> {   
    // retry logic because API is not working properly, it will retry 5 times before failing the test
    for (let i = 0; i < retryCount; i++) {
        // make the API call
        const response = await request.put(url, { data: requestBody });

        // validate status code and schema if status code is expected, otherwise retry
        if (response.status() === expectedStatusCode) {
            const responseBodyJson = await response.json()
            expectedSchema.parse(responseBodyJson)
            return response;
        }
        console.log(`Attempt ${i + 1} failed. Retrying...`);
    }

    // if all retries was unsuccessful, throw an error
    throw new Error('Max retries reached. API call failed.');
}

/**
 * Explanation: Reusable DELETE method with retry logic
 * @param request -> Playwright's APIRequestContext comes from the test method
 * @param url -> the complete URL of the API endpoint
 * @param expectedStatusCode -> expected status code of the API response
 * @param expectedSchema -> expected schema of the API response
 * @param retryCount -> number of times to retry the API call in case of failure (Optional, default is 5)
 * @returns -> the API response
 */
export async function deleteAPI(
    request: APIRequestContext,
    url: string,
    expectedStatusCode: number,
    expectedSchema: ZodTypeAny,
    retryCount: number = 5, // default retry count is 5, if not provided, OPTIONAL parameter
): Promise<APIResponse> {

    // retry logic because API is not working properly, it will retry 5 times before failing the test
    for (let i = 0; i < retryCount; i++) {
        // make the API call
        const response = await request.delete(url);

        // validate status code and schema if status code is expected, otherwise retry
        if (response.status() === expectedStatusCode) {
            const responseBodyJson = await response.json()
            expectedSchema.parse(responseBodyJson)
            return response;
        }
        console.log(`Attempt ${i + 1} failed. Retrying...`);
    }

    // if all retries was unsuccessful, throw an error
    throw new Error('Max retries reached. API call failed.');
}


/**
 * Generates a single random user object
 * @returns User object with random data
 */
export function createRandomUser() {
    return {
        id: faker.number.int({ min: 1000, max: 99999 }),
        username: faker.internet.userName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        userStatus: faker.number.int({ min: 0, max: 9999 })
    };
}

/**
 * Creates multiple random user JSON objects
 * @param count - Number of users to generate
 * @returns Array of user objects with random data
 */
export function createMultipleUserJson(count: number) {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(createRandomUser());
    }
    return users;
}