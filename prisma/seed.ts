import { prisma } from "../src/database.js"

async function main() {
  await prisma.recommendation.createMany({
    data: [
      {
        name: "Caravan Palace - Lone Digger",
        youtubeLink: "https://www.youtube.com/watch?v=UbQgXeY_zi4&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=3&ab_channel=CaravanPalace"
      },
      {
        name: "Felguk - Jack It (Original Mix)",
        youtubeLink: "https://www.youtube.com/watch?v=ATotwgIF89c&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=3&ab_channel=nforcement"
      },
      {
        name: "Miza - Liberty (Original Mix)",
        youtubeLink: "https://www.youtube.com/watch?v=dL_ddzhDey0&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=11&ab_channel=Miza"
      },
      {
        name: "Spitfya - Backfire",
        youtubeLink: "https://www.youtube.com/watch?v=6Wx7bE80D1w&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=5&ab_channel=ReinelexMusic"
      },
      {
        name: "Cheat Codes - Balenciaga (Official Music Video)",
        youtubeLink: "https://www.youtube.com/watch?v=tLA83s4L2pI&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=12&ab_channel=Spinnin%27Records"
      },
      {
        name: "Tujamo & Taio Cruz - Booty Bounce [Official]",
        youtubeLink: "https://www.youtube.com/watch?v=Sc3rZhgpi7o&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=25&ab_channel=ToComusic.TV"
      },
      {
        name: "KURA - Like A Boss (Official Music Video)",
        youtubeLink: "https://www.youtube.com/watch?v=sl2UHmhp4io&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=16&ab_channel=Spinnin%27Records"
      },
      {
        name: "BUNT. – Young Hearts (feat. BEGINNERS) (Lyric Video)",
        youtubeLink: "https://www.youtube.com/watch?v=11C6nfM4XYg&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=19&ab_channel=BUNT.Music"
      },
      {
        name: "Tiësto & Dzeko ft. Preme & Post Malone – Jackie Chan (Official Music Video)",
        youtubeLink: "https://www.youtube.com/watch?v=OWz3rQQaf_Q&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=21&ab_channel=TiestoVEVO"
      },
      {
        name: "Tujamo - Body Language (feat. Miranda Glory & Haris) [Steff Da Campo Remix] (Official Music Video)",
        youtubeLink: "https://www.youtube.com/watch?v=ecgpSS1hXgA&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=23&ab_channel=Spinnin%27Records"
      },
      {
        name: "Timmy Trumpet & JETFIRE - Flamenco (feat. Rage) [Official Audio]",
        youtubeLink: "https://www.youtube.com/watch?v=JMIAQiYGbfI&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=24&ab_channel=Spinnin%27Records"
      },
      {
        name: "WTayllor & Azir - Drift King",
        youtubeLink: "https://www.youtube.com/watch?v=QAkm2n_qpjc&list=PLf_Eb_U98bcNmWkcU0CglN8ABJxCqFh9_&index=8&ab_channel=WilliamTayllor"
      },
    ]
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });