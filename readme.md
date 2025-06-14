# Task API

Deze API is gebouwd met Node.js, Express en MongoDB. Ze laat je toe om taken te beheren via een RESTful interface.

## Endpoints

### GET `/api/tasks`

Haalt alle taken op.

### GET `/api/tasks/:id`

Haalt één taak op via het ID.

### POST `/api/tasks`

Voegt een nieuwe taak toe.  
**Body:**  
```json
{
  "title": "Afwassen en stofzuigen",
  "description": "In de voormiddag moet het huis proper zijn!",
  "category": "huishouden",
  "priority": "hoog",
  "dueDate": "2025-06-30T12:00:00Z"
}
```

### PUT `/api/tasks/:id`

Wijzigt een bestaande taak.  
**Body:**

```json
{
  "title": "string",
  "description": "string"
}
```

### DELETE `/api/tasks/:id`

Verwijdert een taak.

## Authenticatie

Momenteel is er geen authenticatie vereist.

## Opstarten

1. Installeer dependencies:  
   `npm install`
2. Zet een `.env` bestand met je MongoDB connectiestring.
3. Start de server:  
   `npm run dev` of `npm start`

## Extra

- Gemaakt met Express en Mongoose.
- Responses zijn in JSON-formaat.
