## CipherSQLStudio — Browser-Based SQL Sandbox
 A lightweight web-based SQL playground where users can
- Create isolated workspaces
- Build tables visually (no SQL needed)
- Insert sample data
- Write & execute SQL queries
- View results in real-time
- Use AI Assistant to get query hints (not full solutions)

This tool is perfect for learning SQL, practicing queries, or testing database logic safely using PostgreSQL schemas.

# Features 
🔹 Workspace Management
- Create unlimited isolated SQL environments
- Each workspace = its own PostgreSQL schema
- Load existing workspace by ID

🔹 Schema Builder
- Create tables using a visual form
- Define column names & data types
- Backend validation for duplicate tables
- Auto refresh sidebar with updated tables

🔹 Data Insertion
- Insert rows using auto generated form
- Supports dynamic fields based on table columns

🔹 SQL Editor
- Monaco powered editor
- Syntax highlighting
- Execute SQL queries
- Real time results & error messages

🔹 AI Assistant (Gemini)
- Provides hints only – not full SQL answers
- Helps users understand queries

## Tech Stack
# Frontend
- React + TypeScript
- TailwindCSS + ShadCN UI
- React Router
- Monaco Editor

# Backend
- Node.js + Express
- PostgreSQL
- Neon
- MongoDB (workspace persistence)

## Project Structure
```
/backend
  /routes
    - workspace.routes.ts
    - sql.routes.ts
    - llm.routes.ts
  /config
    - db.postgres.ts
    - db.mongo.ts
  /models
    - workspace.model.ts

/frontend
  /src
    /components
      /sidebar
        - Sidebar.tsx
        - TableList.tsx
        - WorkspaceList.tsx
      / ui
      - Header
      - LLM.tsx
      - SqlEditor.tsx
      - Result.tsx
      - TableList.tsx
      - InsertForm.tsx
      - WorkspaceList.tsx
    /pages
      - LandingPage.tsx
      - Dashboard.tsx
    /lib
     - api.tsx
    /utils
    - constant.tsx 
```

## Installation & Setup
# Backend
```
cd Backend
npm install
npm run dev
```

# Frontend
```
cd frontend
npm install
npm run dev
```

## API Endpoints
# Create workspace
```
POST /workspace/create
```
# Create Table
```
POST/ sql/create-table
```
# Insert Table
```
POST /sql/insert-table
```
# Run Query
```
POST /sql/run-query
```
# Get Tables
```
GET /sql/tables/:workspaceId
```
## AI Assistant (Hint Mode Only)
To ensure fairness in SQL learning:

- Does NOT return full SQL solutions
- Provides only hints and guidance
- Suggests direction / syntax tips
  
# Example prompt:
```
"I want to filter order data. Which SQL clause should I use?"
```
# Response (example):
```
"Try using a WHERE clause with the appropriate column."
```
## Sample Queries You Can Run
# Get latest USERS
```
SELECT * FROM users 
WHERE ID =10; 
```
# Join users & orders
```
SELECT u.name, u.email, o.total_amount
FROM users u
JOIN orders o ON u.id = o.user_id;
```

