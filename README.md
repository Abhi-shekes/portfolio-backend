# Portfolio Backend

Backend API for a personal portfolio website, built with Express and MongoDB. It serves content for every section of the site — hero, about, experience, education, skills, projects, publications, and more — through a REST API, and includes JWT-based auth for the admin/editor flows.

## Tech Stack

- Node.js / Express
- MongoDB with Mongoose
- JWT authentication (`jsonwebtoken`, `bcryptjs`)
- CORS, dotenv

## Project Structure

```
config/        # app configuration
controllers/    # auth and section controllers
middleware/     # request middleware
models/         # Mongoose schemas (About, Experience, Project, Publication, ...)
routes/         # one route module per portfolio section
scripts/        # data seeding scripts
server.js       # app entry point
```

## Getting Started

```bash
npm install
cp .env.example .env   # set MONGODB_URI, JWT secret, etc.
npm run dev             # nodemon, for local development
npm start                # production
```

Seed sample data:

```bash
npm run seed
```

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (defaults to `5000`) |
| `MONGODB_URI` | MongoDB connection string |

## API

The API exposes a route module per portfolio section (auth, hero, about, experience, education, skills, projects, volunteer work, publications, patents, awards, certifications, courses, talks, internships, workshops, training, gallery, and more) under `/api/*`, backed by a matching Mongoose model in `models/`.
