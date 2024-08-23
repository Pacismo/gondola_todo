# About

This project was created as part of the interview process for Roulettech on the Kangacook platform.

## Building

The Python code under "/api" requires Django and Python3 to be installed. Django may be installed through PIP.

```pwsh
pip install django # Install the latest version of Django
python manager.py startserver # Start the Django server (requires PWD to be web)
```

The Typescript code under "/web" requires Node.JS to be installed.

```pwsh
npm install # Install dependencies (PWD must be api)
npm run dev # Run the Next.JS/React app
```

## Overview

### `web`

This represents a Web frontend to show a list of items in a TODO list. The list may mark items as either TODO or DONE. The list is ordered such that TODO items are at the top. Filters may be applied such that the list can show only TODO, only DONE, or both.

Each item has a title, a description, and a state. IDs exist in the data to allow the app to refer to the correct item in the list.

### `api`

This represents a Django backend that would allow me to add items to an (essentially global) TODO list.

The schema of the `ToDoItem` table is as follows (although Django may implement it differently):

```sql
CREATE TABLE ToDoItem(
    -- Automatically-incrementing and automatically-generated primary key
    -- translated to `id` when transformed to JSON
    task_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(255) NOT NULL,
    task_description TEXT NOT NULL,
    task_state BOOLEAN NOT NULL,
);
```

Every endpoint has been marked CSRF_EXEMPT to allow the API to be interacted with through clients like [Thunder Client](https://thunderclient.com/), as the intention is that this would be used through the React frontend.

You may access the administrator console using the username "admin" and the password "admin" to see the model data. It stores model data using SQLite.

#### Endpoints

##### GET `/todo/`

Fetches a JSON array of all the TODO items. The data will be sent using the following schema:

```ts
{
    "id": number,
    "task_name": string,
    "task_description": string,
    "task_state": "TODO" | "DONE",
}
```

This endpoint assumes that there is *not* an excessive number of items in the list.

##### POST `/todo/add`

Creates a new entry for the TODO list.

The following schema is required in the body:

```ts
{
    "task_name": string,
    "task_description": string,
    "task_state": "TODO" | "DONE",
}
```

The response will simply be a success message.

##### POST `/todo/mark`

Sets the `task_state` of a TODO item.

The following schema is required in the body:

```ts
{
    "id": number,
    "task_state": "TODO" | "DONE",
}
```

If the task exists, a success message will be returned. Otherwise, you will get a 404 error if the object does not exist, or a bad request error if the `task_state` is neither "TODO" or "DONE" or if any of the required parameters are missing.

##### POST `/todo/remove`

Deletes a task from the TODO list.

The following schema is required in the body:

```ts
{
    "id": number
}
```

If the task exists and is successfully removed, a success code will be returned. Otherwise, you will get a 404 error if the object does not exist, or a bad request error if `id` does not exist.
