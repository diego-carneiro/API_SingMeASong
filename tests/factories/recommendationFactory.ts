import { faker } from "@faker-js/faker"
import { CreateRecommendationData } from "../../src/services/recommendationsService.js"

export default function recommendationFactory(): CreateRecommendationData {
    return {
        name: faker.name.jobTitle(),
        youtubeLink: "https://www.youtube.com/watch?v=NPaAlAL8Z50&ab_channel=Metal8909",
    }
}