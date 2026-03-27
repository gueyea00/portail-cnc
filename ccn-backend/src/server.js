import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

const items = new Map();
let nextId = 1;

app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/api/items", (req, res) => {
  res.json(Array.from(items.values()));
});

app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.get(id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  return res.json(item);
});

app.post("/api/items", (req, res) => {
  const { name, description } = req.body || {};

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required" });
  }

  const now = new Date().toISOString();
  const item = {
    id: nextId++,
    name,
    description: typeof description === "string" ? description : "",
    createdAt: now,
    updatedAt: now
  };

  items.set(item.id, item);
  return res.status(201).json(item);
});

app.put("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const existing = items.get(id);

  if (!existing) {
    return res.status(404).json({ error: "Item not found" });
  }

  const { name, description } = req.body || {};

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required" });
  }

  const updated = {
    ...existing,
    name,
    description: typeof description === "string" ? description : "",
    updatedAt: new Date().toISOString()
  };

  items.set(id, updated);
  return res.json(updated);
});

app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!items.has(id)) {
    return res.status(404).json({ error: "Item not found" });
  }

  items.delete(id);
  return res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`CCN backend listening on http://localhost:${PORT}`);
});
