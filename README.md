# A personal cookbook
This is a full-stack web application that allows users to store and manage their recipes. It is built with **Mongoose**, **Express** and **React**, using **TypeScript**.

## Installation
1. Clone the repository.
2. Install the dependecies.
3. Create a `.env` file in the api directory and add the necessary environment variables:
```
PORT=<port>
MONGO_URI=<your_mongodb_uri>
SECRET=<your_jwt_secret>
```

4. Start the server on two terminals:
 ```
  cd api/ && npm run dev
  cd app/ && npm run dev
  ```
  
 ## Features
- User authentication using JWT
- CRUD operations for recipes
- Recipe search by name, description and tags
- Frontend built using React
- Responsive design using Material-UI
- Integration with React Query for optimized data fetching (with axios)

## Preview
<p align="center">
<img src="https://github.com/vendee29/cookbook/blob/main/screenshot.png" width="20%"/>
</p>

<p align="center">
<img src="https://github.com/vendee29/cookbook/blob/main/preview.gif" width="80%"/>
</p>
