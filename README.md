
# Google Sheets Budget API

It's a simple API that uses Google Sheets API to get data from a Google Sheet File.


## Tech Stack

**Client:** React

**Server:** Node, Express

  
## Installation 

Install google-sheets-api with npm

```bash 
  git clone https://github.com/HugoLiconV/google-sheets-api.git
  cd google-sheets-api
  npm install
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GOOGLE_SHEET_ID`

`GOOGLE_CLIENT_EMAIL`

`GOOGLE_PRIVATE_KEY`

`ORIGIN`

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

  
## Running Tests

To run tests, run the following command

```bash
  npm run test
```

  
## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

  