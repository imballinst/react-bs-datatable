import { writeFile } from 'fs/promises';
import path from 'path';

const NAMES = [
  'Aaren',
  'Adriana',
  'Alameda',
  'Alisha',
  'Alyssa',
  'Andeee',
  'Annabela',
  'Arabel',
  'Aryn',
  'Aurelie',
  'Basia',
  'Bernardine',
  'Beverley',
  'Bobbi',
  'Briney',
  'Cam',
  'Carlie',
  'Caryl',
  'Cecile',
  'Charmaine',
  'Christal',
  'Clarice',
  'Concettina',
  'Corly',
  'Cyndie',
  'Danny',
  'Dawn',
  'Deloria',
  'Diena',
  'Doralynne',
  'Drucie',
  'Edith',
  'Elise',
  'Elyssa',
  'Ericka',
  'Eugine',
  'Farrah',
  'Fina',
  'Fred',
  'Gaylene',
  'Gertrud',
  'Glenda',
  'Gui',
  'Hannis',
  'Helsa',
  'Hyacinthe',
  'Ira',
  'Jacquetta',
  'Jany',
  'Jennica',
  'Joane',
  'Jolyn',
  'Juliane',
  'Kamilah',
  'Kary',
  'Katuscha',
  'Ketti',
  'Konstance',
  'Lacie',
  'Lauryn',
  'Leona',
  'Lila',
  'Lita',
  'Lorie',
  'Lulita',
  'Madeleine',
  'Mallory',
  'Margette',
  'Marita',
  'Mary',
  'Maye',
  'Melodie',
  'Micheline',
  'Mireielle',
  'Mureil',
  'Nariko',
  'Netty',
  'Nollie',
  'Olwen',
  'Paola',
  'Perry',
  'Priscilla',
  'Raquela',
  'Rhea',
  'Robinia',
  'Rosanne',
  'Rubie',
  'Sara-Ann',
  'Shandie',
  'Shel',
  'Sidoney',
  'Starla',
  'Suzette',
  'Tani',
  'Thalia',
  'Tobe',
  'Trudie',
  'Vanessa',
  'Violet',
  'Wileen',
  'Yetty'
];
const PLANETS = ['Earth', 'Mars', 'Saturn', 'Jupyter', 'Venus'];

main();

async function main() {
  const data = Array.from(new Array(60), () => ({
    ...getNameAndUsername(),
    date: getRandomDateWithinOneMonth(),
    score: getRandomScore(),
    location: getRandomPlanet()
  }));
  await writeFile(
    path.join(__dirname, '../src/__stories__/data/story-data.json'),
    JSON.stringify(data),
    'utf-8'
  );
}

// Helper functions.
function getNameAndUsername() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  return {
    name,
    username: `${name.toLowerCase()}-${getRandomScore()}`
  };
}

function getRandomDateWithinOneMonth() {
  // 1 day times a certain number.
  const dayMultiplier = 86400000 * Math.ceil(Math.random() * 60);
  return new Date(Date.now() + dayMultiplier).toISOString();
}

function getRandomScore() {
  return Math.floor(Math.random() * 100);
}

function getRandomPlanet() {
  return PLANETS[Math.floor(Math.random() * PLANETS.length)];
}
