# Wedding RSVP System 💍

A full-stack Wedding RSVP Management System built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

* Guest RSVP Form
* Groom's Side & Bride's Side Selection
* Relationship Selection
* Attendance Confirmation
* Meal Preference Selection
* Personalized Messages
* Admin Login Dashboard
* View All RSVPs
* Delete RSVPs
* RSVP Statistics

## Admin Access

The application includes an admin dashboard for viewing RSVP statistics and managing guest responses.

Admin authentication is currently implemented for development purposes and should be replaced with a secure authentication system before production deployment.

## Technologies Used

### Frontend

* React
* TypeScript
* Vite
* Bootstrap

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Installation

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
node server.js
```

## API Endpoints

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| POST   | /rsvp     | Create RSVP         |
| GET    | /rsvps    | Get all RSVPs       |
| GET    | /stats    | Get RSVP statistics |
| DELETE | /rsvp/:id | Delete RSVP         |

## Author

Diane Umulisa
