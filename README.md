# Flight Search Application

This is a simple flight search application that allows users to search for flights based on various criteria such as departure and arrival cities, trip type (round or one-way), and departure date.

## Installation

To run the application, you need to install the dependencies first. Open your terminal and run the following command:

```bash
npm install
```

This will install the required packages.

## Mock API Server

Before starting the application, you need to run the mock API server. Use the following command:

```bash
npm run server
```

This will start the mock API server, providing the necessary flight data.

## Running the Application

Once the mock API server is running, you can start the application with the following command:

```bash
npm start
```

The application will be accessible at http://localhost:3000 in your web browser.

## Example Scenario

After running the application, you can perform a sample search scenario:

Select "One way" trip type.
Choose "City A" as the departure city.
Choose "City B" as the arrival city.
Set the departure date to "25.12.2023".
Click the "Search flights" button.
This will trigger a search for one-way flights from City A to City B on December 25, 2023.
