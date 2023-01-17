import { describe, it, expect, beforeAll } from "vitest";
import supertest from "supertest";

import { Server } from "./server";

describe("Server", () => {
	let request: supertest.SuperTest<supertest.Test>;
	beforeAll(async () => {
		const server = new Server();
		const app = await server.bootstrap();
		request = supertest(app);
	});

	it("should call hello endpoint", async () => {
		const res = await request.get("/hello");
		expect(res.body).toEqual({ message: "Hello world!" });
	});

	it("should have a 400 error on rechercher endpoint call without param", async () => {
		const res = await request.get("/api/rechercher");
		expect(res.status).toBe(400);
	});

	it("should list employees on rechercher endpoint call with 'mode=all' param", async () => {
		const res = await request.get("/api/rechercher?mode=all");
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
	});

	it("should get employee by name on rechercher endpoint call with 'name' param", async () => {
		const res = await request.get("/api/rechercher?name=DUPOND");
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
	});
});
