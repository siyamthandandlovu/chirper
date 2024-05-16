import {describe, it,test,expect} from "bun:test"
import app from "../index.ts";

describe("Instantiation", () => {
    it("should return 200 response",async () => {
        const req = new Request("http://localhost/"
            //const response = await
        )
    })
})

test('GET /hello is ok', async () => {
  const res = await app.request('/hello')
  expect(res.status).toBe(200)
})