import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  if (process.env.NODE_ENV === "prod") {
    const defaultOptions = await getConnectionOptions();
    return createConnection(
      Object.assign(defaultOptions, {
        url: process.env.HOST_MONGO,
      })
    );
  } else {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
      Object.assign(defaultOptions, {
        host: "localhost",
        port: 27017,
        database: process.env.NODE_ENV === "test" ? "dtmoney_tests" : "dtmoney",
        dropSchema: process.env.NODE_ENV === "test" ? true : false,
      })
    );
  }
};
