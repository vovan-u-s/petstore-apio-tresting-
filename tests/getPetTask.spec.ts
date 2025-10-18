import { test, expect } from '@playwright/test';
import { fa, faker, Faker } from '@faker-js/faker';
import { z } from 'zod';
import { env } from 'process';
import { getAPI, postAPI, deleteAPI, putAPI } from '../utils/apiCallHelper';
import { get } from 'http';
test.describe('Get Pet Task API tests', () => {
    const baseURL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const createPetRespounceBody = {
        id: "9222968140497180476",
        category: {
            id: 1,
            name: "c"
        },
        name: "Tim",
        photoUrls: [
            "https://blog.thezoo.ru/wp-content/uploads/2013/05/0a2b847cadea7ad1c3c4fc302c57e2b8.jpg"
        ],
        tags: [
            {
                id: 1,
                name: "Tag1"
            }
        ],
        status: "available"
    };
    test('get pet by id with two paramert', async ({ request }) => {
        await getAPI(request, `${baseURL}/pet/findByStatus`, 200, z.any(), { key: 'Value', status: "available", id: createPetRespounceBody.id });
    })
})