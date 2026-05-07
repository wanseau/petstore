# Data Model: Petstore E-commerce

This document outlines the database schema and entity models for the application.

## 1. Database Schema

### `pets` Table (PostgreSQL)

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the pet. |
| `name` | `VARCHAR(255)` | NOT NULL | The name of the pet. |
| `breed` | `VARCHAR(255)` | | The breed or specific species. |
| `category` | `VARCHAR(255)` | NOT NULL | High-level grouping (e.g., Dog, Cat, Bird). |
| `price` | `NUMERIC(38,2)` | NOT NULL | The price of the pet. |
| `description` | `TEXT` | | Detailed information about the pet. |
| `image_url` | `VARCHAR(255)` | | URL to a photo of the pet. |
| `stock_quantity` | `INTEGER` | DEFAULT 1 | Number of available pets of this type. |

## 2. API Payloads

### `Pet` Object (JSON)

Used in standard API responses (`GET /api/pets`, `GET /api/pets/{id}`) and requests (`POST /api/pets`, `PUT /api/pets/{id}`).

```json
{
  "id": 1,
  "name": "Bella",
  "breed": "Golden Retriever",
  "category": "Dog",
  "price": 1200.00,
  "description": "Friendly and energetic family dog.",
  "imageUrl": "https://example.com/images/bella.jpg",
  "stockQuantity": 1
}
```
