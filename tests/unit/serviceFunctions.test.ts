import { jest } from "@jest/globals";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { dummyRecommendations } from "../factories/recommendationFactory";

describe("Recommendations UNIT tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
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

  it("Must remove a Recommendation", async () => {
    const recommendation = {
      id: 1,
      name: "KURA - Like A Boss (Official Music Video)",
      youtubeLink:
        "https://www.youtube.com/watch?v=sl2UHmhp4io&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=16&ab_channel=Spinnin%27Records",
      score: -100,
    };

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValue(recommendation);
    jest.spyOn(recommendationRepository, "remove");

    await recommendationService.downvote(recommendation.id);

    expect(recommendationRepository.remove).toBeCalled();
  });

  it("Must recognize a duplicate Recommendation name - INSERT", async () => {
    const fakeRecommendation = {
      id: 1,
      name: "KURA - Like A Boss (Official Music Video)",
      youtubeLink:
        "https://www.youtube.com/watch?v=sl2UHmhp4io&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=16&ab_channel=Spinnin%27Records",
      score: 1,
    };

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValue(fakeRecommendation);

    expect(
      recommendationService.insert({
        name: fakeRecommendation.name,
        youtubeLink: fakeRecommendation.youtubeLink,
      })
    ).rejects.toEqual({
      message: "Recommendation name already in use",
      type: "conflict",
    });
  });

  it("Must return getRandom array length greater than 0", async () => {
    const recommendations = [
      {
        id: 1,
        name: "KURA - Like A Boss (Official Music Video)",
        youtubeLink:
          "https://www.youtube.com/watch?v=sl2UHmhp4io&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=16&ab_channel=Spinnin%27Records",
        score: 100,
      },
      {
        id: 2,
        name: "BUNT. – Young Hearts (feat. BEGINNERS) (Lyric Video)",
        youtubeLink:
          "https://www.youtube.com/watch?v=11C6nfM4XYg&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=19&ab_channel=BUNT.Music",
        score: 200,
      },
      {
        id: 3,
        name: "Tiësto & Dzeko ft. Preme & Post Malone – Jackie Chan (Official Music Video)",
        youtubeLink:
          "https://www.youtube.com/watch?v=OWz3rQQaf_Q&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=21&ab_channel=TiestoVEVO",
        score: 300,
      },
    ];

    jest.spyOn(recommendationService, "getScoreFilter").mockReturnValue("gt");
    jest
      .spyOn(recommendationService, "getByScore")
      .mockResolvedValue(recommendations);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue(recommendations);

    await recommendationService.getRandom();

    expect(recommendationRepository.findAll).toBeCalled();
  });

  it("Must return not_found Recommendations", async () => {
    jest.spyOn(recommendationService, "getScoreFilter").mockReturnValue("gt");
    jest.spyOn(recommendationService, "getByScore").mockResolvedValue([]);
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

    expect(async () => {
      await recommendationService.getRandom();
    }).rejects.toEqual({ message: "", type: "not_found" });
  });

  it("Must return lte while testing getScoreFilter", async () => {
    mockRandomNumber(0.3);

    const recommendation = [
      {
        id: 1,
        name: "KURA - Like A Boss (Official Music Video)",
        youtubeLink:
          "https://www.youtube.com/watch?v=sl2UHmhp4io&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=16&ab_channel=Spinnin%27Records",
        score: -100,
      },
      {
        id: 2,
        name: "BUNT. – Young Hearts (feat. BEGINNERS) (Lyric Video)",
        youtubeLink:
          "https://www.youtube.com/watch?v=11C6nfM4XYg&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=19&ab_channel=BUNT.Music",
        score: 200,
      },
      {
        id: 3,
        name: "Tiësto & Dzeko ft. Preme & Post Malone – Jackie Chan (Official Music Video)",
        youtubeLink:
          "https://www.youtube.com/watch?v=OWz3rQQaf_Q&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=21&ab_channel=TiestoVEVO",
        score: 300,
      },
    ];

    jest
      .spyOn(recommendationService, "getScoreFilter")
      .mockReturnValueOnce("lte");
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue(recommendation);

    await recommendationService.getRandom();

    expect(recommendationRepository.findAll).toBeCalledTimes(1);
  });
});

function mockRandomNumber(number: number) {
  const mockMathRandom = Object.create(global.Math);
  mockMathRandom.random = () => number;
  global.Math = mockMathRandom;

  return mockMathRandom;
}
