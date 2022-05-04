import app from "../src/app";
import supertest from "supertest";
import { prisma } from "../src/database.js";

import recommendationFactory from "./factories/recommendationFactory";
import exp from "constants";

describe("POST Recommendation", () => {
    beforeEach(truncateRecommendations);    

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
        const repeatedName  = await prisma.recommendation.findMany({
            where: {
                name: body.name
            }
        });

        expect(errorSource.status).toEqual(500);
        expect(repeatedName.length).toEqual(1);
    });
});

async function truncateRecommendations() {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  }
  
  async function disconnect() {
    await prisma.$disconnect();
  }