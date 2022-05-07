import app from "../src/app";
import supertest from "supertest";
import { prisma } from "../src/database.js";

import { recommendationFactory } from "./factories/recommendationFactory";
import { dummyRecommendations } from "./factories/recommendationFactory";

describe("POST Recommendation", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it("Must return 201 and store data given a valid requisition", async () => {
    const body = recommendationFactory();

    const promise = await supertest(app).post("/recommendations").send(body);
    const storedData = await prisma.recommendation.findUnique({
      where: {
        name: body.name,
      },
    });

    expect(promise.status).toEqual(201);
    expect(storedData).not.toBeNull();
  });

  it("Must return 422 given an invalid requisition", async () => {
    const body = {};

    const promise = await supertest(app).post("/recommendations").send(body);

    expect(promise.status).toEqual(422);
  });

  it("Must return 409 given a duplicate recommendation name", async () => {
    const body = recommendationFactory();

    await supertest(app).post("/recommendations").send(body);
    const errorSource = await supertest(app)
      .post("/recommendations")
      .send(body);
    const repeatedName = await prisma.recommendation.findMany({
      where: {
        name: body.name,
      },
    });

    expect(errorSource.status).toEqual(409);
    expect(repeatedName.length).toEqual(1);
  });
});

describe("POST Recommendation UPVOTE", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it("Must return 200 and store data given an valid requisition", async () => {
    await dummyRecommendations(); //createAllRecommendations

    const beforeVote = await prisma.recommendation.findFirst();

    const promise = await supertest(app)
      .post(`/recommendations/${beforeVote.id}/upvote`)
      .send();

    const afterVote = await prisma.recommendation.findUnique({
      where: {
        id: beforeVote.id,
      },
    });

    expect(promise.status).toEqual(200);
    expect(afterVote.score - beforeVote.score).toEqual(1);
  });
});

describe("POST Recommendation DOWNVOTE", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it("Must return 200 and store data given an valid requisition", async () => {
    await dummyRecommendations(); //createAllRecommendations

    const beforeVote = await prisma.recommendation.findFirst();

    const promise = await supertest(app)
      .post(`/recommendations/${beforeVote.id}/downvote`)
      .send();

    const afterVote = await prisma.recommendation.findUnique({
      where: {
        id: beforeVote.id,
      },
    });

    expect(promise.status).toEqual(200);
    expect(beforeVote.score - afterVote.score).toEqual(1);
  });
});

describe("GET the last ten Recommendations", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it("Must return 200 and the last ten Recommendations given an valid requisition", async () => {
    await dummyRecommendations();

    const response = await supertest(app).get("/recommendations");

    expect(response.body.length).toEqual(10);
  });
});

describe("GET Recommendations by Id", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it("Must return 200 and a Recommendation given an valid requisition", async () => {
    await dummyRecommendations();
    const recommendation = await prisma.recommendation.findUnique({
      where: {
        id: 7,
      },
    });

    const response = await supertest(app).get(
      `/recommendations/${recommendation.id}`
    );

    expect(response.body.id).toEqual(recommendation.id);
  });
});

describe("GET Random Recommendations", () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it("Must return 200 and a single random Recommendation", async () => {
    const allRecommendations = await dummyRecommendations();
console.log(allRecommendations[6]);

    const testingRecommendation = await prisma.recommendation.create({
      data: { ...allRecommendations[6], score: 320 },
    });

    const promise = await supertest(app).get("/recommendations/random");

    expect(promise.status).toEqual(200);
    expect(promise.body).toEqual(testingRecommendation);
  });
});

async function truncateRecommendations() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE;`;
}

async function disconnect() {
  await prisma.$disconnect();
}
