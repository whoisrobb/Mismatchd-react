# [Mismatchd E-Commerce](https://mismatchd.vercel.app/)

   Mismatchd is an enterprise ecommerce app with an intergrated CMS dashboard built with React, Express and PostgreSQL.

[![Mismatchd](./client/public/mismatchd.png)](https://mismatchd.vercel.app/)

> **Warning**
> This project is a hobby/portfolio project and is still in development.
>

## Tech Stack

- **Client Framework:** [React]
- **Server Framework:** [Express]
- **Database:** [PostgreSQL]
- **Authentication:** [Clerk](https://clerk.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **User Management:** [Json Web Tokens]
- **ORM:** [Sequelize]
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **File Uploads:** [Multer](https://github.com/expressjs/multer) and [React Dropzone](https://github.com/zenoamaro/react-quill)

## Features to be implemented

- [x] Authentication with **Clerk**
- [x] ORM using **Sequelize**
- [x] Validation with **Zod**
- [ ] Custom Authentication pages
- [ ] File uploads with **uploadthing**


# Running Locally

1. Clone the repository

   ```bash
   git clone https://https://github.com/whoisrobb/Mismatchd-react.git
   ```


## Server (Express JS, Javascript)

1. Navigate to the client directory

   ```bash
   cd server
   ```

2. Install dependencies using npm

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the project and set the following environment variables:

    ```plaintext
    DATABASE_URL=your_database_url
    ```

    Replace `your_database_url` with appropriate values.

4. Run the app

   ```bash
   npm start
   ```


## Frontend (React, Typescript)

1. Navigate to the client directory

   ```bash
   cd client
   ```

2. Install dependencies using npm

   ```bash
   npm install
   ```

3. Navigate to /src/lib/utils.ts and modify the server url to your local server url 

   ```typescript
   export const serverUrl = your_local_server_url;
   ```

   Replace ` your_local_server_url` with the appropriate value.

4. Run the app

   ```bash
   npm run dev
   ```
   