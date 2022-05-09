import { jest } from "@jest/globals";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { dummyRecommendations, recommendationFactory } from "../factories/recommendationFactory";

describe("Recommendations UNIT tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks()
  });

  it("Must return not found - UPVOTE", async () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

    expect(async () => {
      await recommendationService.upvote(7);

    }).rejects.toEqual({ message: "", type: "not_found" });
  });

  it("Must return not found - DOWNVOTE", async () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

    expect(async () => {
      await recommendationService.downvote(7);

    }).rejects.toEqual({ message: "", type: "not_found" });
  });

  it("Must recognize a duplicate Recommendation name - INSERT", async () => {
    const fakeRecommendation = {
      id: 1,
      name: "KURA - Like A Boss (Official Music Video)",
      youtubeLink:
        "https://www.youtube.com/watch?v=sl2UHmhp4io&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=16&ab_channel=Spinnin%27Records",
      score: 1,
    };

    jest.spyOn(recommendationRepository, "findByName").mockResolvedValue(fakeRecommendation);

    expect(
      recommendationService.insert({
        name: fakeRecommendation.name,
        youtubeLink: fakeRecommendation.youtubeLink
      })
    ).rejects.toEqual("Recommendations names must be unique");
  });

  // it("")


});
