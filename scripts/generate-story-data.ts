import { writeFile } from 'fs/promises';
import path from 'path';
import { format } from 'date-fns';

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
const NUMBER_OF_ENTRIES = 60;

main();

async function main() {
  const data = Array.from(new Array(NUMBER_OF_ENTRIES), (_, idx) => ({
    ...getNameAndUsername(idx),
    date: getRandomDateWithinOneMonth(),
    score: getRandomScore(),
    location: getRandomPlanet()
  }));
  await writeFile(
    path.join(__dirname, '../src/__stories__/resources/story-data.json'),
    JSON.stringify(data),
    'utf-8'
  );
}

// Helper functions.
function getNameAndUsername(idx: number) {
  const name = NAMES[Math.floor(idx * (NAMES.length / NUMBER_OF_ENTRIES))];
  return {
    name,
    username: `${name.toLowerCase()}-${getRandomScore()}`
  };
}

function getRandomDateWithinOneMonth() {
  // 1 day times a certain number.
  const dayMultiplier = 86400000 * Math.ceil(Math.random() * 60);
  return format(new Date(Date.now() + dayMultiplier), 'MMMM dd, yyyy');
}

function getRandomScore() {
  return Math.floor(Math.random() * 100);
}

function getRandomPlanet() {
  return PLANETS[Math.floor(Math.random() * PLANETS.length)];
}
