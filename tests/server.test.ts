import app from "../src/app";
import supertest from "supertest";
import { prisma } from "../src/database.js";

import recommendationFactory from "./factories/recommendationFactory";

describe("POST Recommendation", () => {
	beforeEach(truncateRecommendations);
	afterAll(disconnect);

	it("Must return 201 and store data given a valid requisition", async () => {
		const body = recommendationFactory();

		const promise = await supertest(app).post("/recommendations").send(body);
		const storedData = await prisma.recommendation.findUnique({
			where: {
				name: body.name
			}
		});

		expect(promise.status).toEqual(201);
		expect(storedData).not.toBeNull();
	});

	it("Must return 422 given an invalid requisition", async () => {
		const body = {}

		const response = await supertest(app).post("/recommendations").send(body);

		expect(response.status).toEqual(422);
	});

	it("Must return 409 given a duplicate recommendation name", async () => {
		const body = recommendationFactory();

		await supertest(app).post("/recommendations").send(body);
		const errorSource = await supertest(app).post("/recommendations").send(body);
		const repeatedName = await prisma.recommendation.findMany({
			where: {
				name: body.name
			}
		});

		expect(errorSource.status).toEqual(409);
		expect(repeatedName.length).toEqual(1);
	});
});

describe("POST Recommendation vote", () => {
	beforeEach(truncateRecommendations);
	afterAll(disconnect);

	it("Must return 200 and store data given an valid requisition", async () => {
		const currentScore = await prisma.recommendation.findUnique({
			where: {
				id: 1
			}
		});
		console.log(currentScore, "TESTE");


	})
});

describe("GET the last ten Recommendations", () => {
	beforeEach(truncateRecommendations);
	afterAll(disconnect);

	it("Must return 200 and the last ten Recommendations given an valid requisition", async () => {
		const lastTenRecommendations = await prisma.recommendation.findMany({		});
		console.log(lastTenRecommendations, "TESTE");


	})
});


async function truncateRecommendations() {
	await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
}

async function disconnect() {
	await prisma.$disconnect();
}