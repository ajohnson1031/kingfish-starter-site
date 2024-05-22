import mysql from "mysql2/promise";

let connection: mysql.Connection | null = null;

export const connectDatabase = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.NEXT_PUBLIC_DB_HOST,
      user: process.env.NEXT_PUBLIC_DB_USER,
      password: process.env.NEXT_PUBLIC_DB_PASSWORD,
      database: process.env.NEXT_PUBLIC_DB_DATABASE,
    });
    console.log("Connected to database.");
  }
  return connection;
};

export const getDatabaseConnection = () => {
  if (!connection) {
    throw new Error("Database connection not established.");
  }
  return connection;
};
