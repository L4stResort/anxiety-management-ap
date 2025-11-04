# Anxiety Management App Backend

This document provides an overview of the backend architecture and setup for the Anxiety Management App.

## Overview

The backend of the Anxiety Management App is built using Node.js and Express, providing a RESTful API to handle requests from the frontend. It integrates with MongoDB for data storage and utilizes the Groq API for AI-driven recommendations based on user input.

## Project Structure

```
backend
├── src
│   ├── controllers        # Contains the logic for handling requests
│   │   └── aiController.ts
│   ├── routes             # Defines the API routes
│   │   └── aiRoutes.ts
│   ├── models             # Mongoose models for MongoDB
│   │   └── User.ts
│   ├── services           # Services for external API interactions
│   │   └── groqService.ts
│   └── types              # TypeScript types and interfaces
│       └── index.ts
├── package.json           # NPM dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Documentation for the backend
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd anxiety-management-app/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

- Ensure you have MongoDB running and accessible.
- Set up environment variables for sensitive information such as database connection strings and Groq API keys.

## Running the Application

To start the backend server, run the following command:
```
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

The backend exposes the following API endpoints:

- `POST /api/ai/recommendations`: Submits GAD-7 test results and retrieves personalized recommendations.
- Additional endpoints can be added as needed.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.