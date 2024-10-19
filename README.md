# EventSpark

This project is used for the frontend development of EventSpark. Follow is the quick guide for how to use.

## Development Tools

1. VS Code
2. "Astro" extension to be install in VS Code
3. NodeJS v20 LTS version

## Environment Prepare

Install all dependencies

```bash
npm install
```

### Build project

```bash
npm run build
```

### Start project

```bash
npm run dev
```

#### Start project with Docker
##### Build Docker image
```bash
docker build -t frontend .
```
##### Delete previous Docker container (If previously created, you will need to delete the previous container)
```bash
docker rm frontend
```
##### Run Docker container
```bash
docker run -d --name frontend -p 3000:3000 frontend
```

### Run unit test

```bash
npm run test
```

#### For Test-Driven-Development (TDD)
Refer to the first test case: (src/html/components/dashboard/tests/_sidenav.test.ts)

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```
