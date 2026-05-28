# 💍 Wedding Website — Salome & Michael

A custom wedding website built for a real event, featuring RSVP management, guest information, and event details.

## Features

- RSVP form with backend validation
- Guest management via REST API
- Authentication system
- MongoDB database

## Tech Stack

- **Frontend** — HTML, CSS, JavaScript
- **Backend** — Node.js, Express
- **Database** — MongoDB (Mongoose)
- **Auth** — JWT

## Getting Started

```bash
git clone https://github.com/rudy002/WeddingWebsite-Salome-Michael.git
cd WeddingWebsite-Salome-Michael/backend
npm install
```

Create a `.env` file in `/backend`:
```env
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm start
```
