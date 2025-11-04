# Anxiety Management App

## Overview
The Anxiety Management App is designed to help users manage their anxiety through personalized recommendations and resources. The application utilizes a combination of frontend and backend technologies to provide a seamless user experience.

## Technologies Used
- **Frontend**: React or Next.js
- **Backend**: Node.js with Express or Next.js API routes
- **Database**: MongoDB
- **AI Integration**: Groq API for personalized recommendations

## Project Structure
The project is organized into two main directories: `frontend` and `backend`.

### Frontend
- **src/components**: Contains React components, including `AnxietyTips.tsx` for displaying personalized tips.
- **src/pages**: Contains the main page component (`index.tsx`) that includes the GAD-7 test form and displays user scores and recommendations.
- **src/services**: Contains API service functions for making calls to the backend.
- **src/types**: Contains TypeScript interfaces for data structures used in the frontend.
- **package.json**: Configuration file for npm dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file.

### Backend
- **src/controllers**: Contains the `AIController` class for processing GAD-7 test results and interacting with the Groq API.
- **src/routes**: Contains route definitions for AI-related endpoints.
- **src/models**: Contains the Mongoose model for user data.
- **src/services**: Contains the service for interacting with the Groq API.
- **src/types**: Contains TypeScript interfaces for data structures used in the backend.
- **package.json**: Configuration file for npm dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file.

## Features
- GAD-7 test for assessing anxiety levels.
- Personalized recommendations based on user input.
- User-friendly interface for managing anxiety.

## Getting Started
1. Clone the repository.
2. Navigate to the `frontend` and `backend` directories and install dependencies using `npm install`.
3. Start the frontend and backend servers.
4. Access the application in your web browser.

## Future Enhancements
- Implement user authentication.
- Add more resources and tips for anxiety management.
- Improve AI recommendations based on user feedback.

## License
This project is licensed under the MIT License.