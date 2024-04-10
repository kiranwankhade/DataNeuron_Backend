# DataNeuron Backend API

The DataNeuron Backend API provides a simple interface to add, update, and track data entries, along with counting the operations performed. This document outlines the available endpoints and how to interact with them.

## Base URL

The API is currently deployed at: [https://dataneuron-backend-kp89.onrender.com](https://dataneuron-backend-kp89.onrender.com)

## Endpoints

### 1. Get Data

- **Endpoint:** `/task/`
- **Method:** `GET`
- **Description:** Fetches all the data entries from the backend.
- **Response:** An array of data objects.

### 2. Create Data

- **Endpoint:** `/task/create`
- **Method:** `POST`
- **Description:** Adds a new data entry.
- **Body:**
  ```json
  {
    "task": "Sample data",
    "description": "Additional information"
  }
- **Response:** An array of data objects.

### 3. Update Data

- **Endpoint:** `/task/update/${id}`
- **Method:** `PATCH`
- **Description:** Update the Existing data.
- **Body:**
  ```json
  {
    "task": "Updated data",
    "description": "Additional Updated information"
  }
- **Response:**  The updated data object.

### 4. Get Count
- **Endpoint:**  `/task/getCount`
- **Method:** `GET`
- **Description:** Retrieves the count of add and update operations performed.
- **Body:**
  ```json
  {
    "addCount": 5,
    "updateCount": 3
  }
- **Response:**  Get the updated Counts of operations.


## Deployed Backend
The backend for this project is deployed on Render and can be accessed here: (https://github.com/kiranwankhade/DataNeuron_Backend).

This setup ensures a seamless flow for managing and tracking data entries through a simple and intuitive API.
