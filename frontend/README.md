# Anxiety Management App - Frontend Documentation

## Overview
The Anxiety Management App is designed to help users manage their anxiety through personalized recommendations and resources. This frontend application is built using React (or Next.js) and communicates with a Node.js backend to provide a seamless user experience.

## Features
- GAD-7 Test: Users can take the GAD-7 test to assess their anxiety levels.
- Personalized Recommendations: Based on the test results, users receive tailored anxiety management tips and resources.
- User-Friendly Interface: The application is designed to be intuitive and easy to navigate.

## Project Structure
The frontend of the application is organized as follows:

```
frontend
├── src
│   ├── components
│   │   └── AnxietyTips.tsx       # Component for displaying anxiety management tips
│   ├── pages
│   │   └── index.tsx              # Main page component with GAD-7 test and recommendations
│   ├── services
│   │   └── api.ts                 # API service for backend communication
│   └── types
│       └── index.ts               # TypeScript interfaces for data structures
├── package.json                    # NPM configuration file
└── tsconfig.json                   # TypeScript configuration file
```

## Installation
To get started with the frontend application, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd anxiety-management-app/frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Usage
- Navigate to the main page to take the GAD-7 test.
- After submitting the test, view your score and receive personalized recommendations based on your responses.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.