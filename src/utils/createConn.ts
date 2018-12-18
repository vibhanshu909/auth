import { createConnection, getConnectionOptions } from "typeorm";

const createConn = async () => {
  console.log("NODE_ENV= ", process.env.NODE_ENV)
  const options = await getConnectionOptions(process.env.NODE_ENV)
  // console.log("options: ", options)
  return createConnection({ ...options, name: "default" })
}
export default createConn;