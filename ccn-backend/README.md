# CCN Backend

Express backend (CRUD) for the CCN project.

## Run

1) Install dependencies:

```bash
npm install
```

2) Start in dev mode:

```bash
npm run dev
```

3) Health check:

```bash
curl http://188.165.77.237:4000/health
```

## CRUD Endpoints

- GET /api/items
- GET /api/items/:id
- POST /api/items
- PUT /api/items/:id
- DELETE /api/items/:id

Example payload:

```json
{ "name": "Example", "description": "Optional" }
```
