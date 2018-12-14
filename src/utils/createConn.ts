import { createConnection, getConnectionOptions } from "typeorm";

const createConn = async () => {
  console.log("ENV= ", process.env.ENV)
  const options = await getConnectionOptions(process.env.ENV)
  console.log("options: ", options)
  return createConnection({ ...options, name: "default" })
}
export default createConn;