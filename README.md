# Playwright API Testing Project

A comprehensive API testing framework using Playwright, TypeScript, Zod for schema validation, and Faker for dynamic test data generation.

## 🚀 Features

- ✅ **Playwright Test** - Modern testing framework for API automation
- ✅ **TypeScript** - Type-safe test development
- ✅ **Zod** - Runtime schema validation for API responses
- ✅ **Faker.js** - Dynamic test data generation
- ✅ **Environment Variables** - Configuration via `.env` files
- ✅ **Multiple Reporters** - HTML, List, and JSON reporting

## 📁 Project Structure

```
petstore-apio-testing/
├── tests/
│   └── example.spec.ts          # API test examples
├── schemas/
│   └── example.schema.ts        # Zod validation schemas
├── .gitignore                   # Git ignore rules
├── .env.example                 # Environment variables template
├── package.json                 # Project dependencies
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                    # This file
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd petstore-apio-testing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers** (optional, not needed for API testing)
   ```bash
   npx playwright install
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your API base URL and credentials.

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Show test report
npm run test:report
```

## 📝 Test Examples

The project includes comprehensive examples demonstrating:

- **GET requests** - Fetch and validate data
- **POST requests** - Create resources with Faker data
- **PUT requests** - Update resources
- **DELETE requests** - Remove resources
- **Schema validation** - Validate API responses with Zod
- **Error handling** - Handle invalid endpoints and data

## 🔍 Schema Validation

Zod schemas are defined in `schemas/example.schema.ts`:

```typescript
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
});
```

Usage in tests:

```typescript
const validationResult = UserSchema.safeParse(responseData);
expect(validationResult.success).toBeTruthy();
```

## 🎲 Test Data Generation

Faker.js is used to generate dynamic test data:

```typescript
const newUser = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};
```

## 📊 Reporting

Test results are available in multiple formats:

- **HTML Report** - `playwright-report/index.html`
- **Console Output** - Real-time test execution logs
- **JSON Report** - `test-results/results.json`

## ⚙️ Configuration

### Playwright Config (`playwright.config.ts`)

- Test directory: `./tests`
- Timeout: 30 seconds
- Base URL: Configurable via `.env`
- Reporters: HTML, List, JSON

### TypeScript Config (`tsconfig.json`)

- Target: ES2020
- Strict mode enabled
- Module resolution: Node

## 🤝 Contributing

Feel free to contribute by:

1. Adding new test scenarios
2. Creating additional schemas
3. Improving documentation
4. Reporting issues

## 📄 License

ISC

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Zod Documentation](https://zod.dev/)
- [Faker.js Documentation](https://fakerjs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
