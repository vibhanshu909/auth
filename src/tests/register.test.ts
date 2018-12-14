import { request } from 'graphql-request';
import createConn from '../utils/createConn';

let conn: any = null;
beforeAll(async () => {
  conn = await createConn();
});

test("Register User", async () => {
  const args = {
    email: "vsquarevision7@gmail.com",
    password: "@Iamvsquare909"
  }
  const mutation = `mutation{
    register(email: "${args.email}", password: "${args.password}"){
      id
      email
    }
  }`
  // await startServer();
  const response: any = await request("http://localhost:4000", mutation)
  expect(response.register).toBeInstanceOf(Object)
})

afterAll(async () => {
  await conn.close()
})