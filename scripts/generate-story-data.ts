import { readFile, writeFile } from 'fs/promises';

import { format } from 'date-fns';
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
// Include null in PLANETS to test searching against null values.
const PLANETS = ['Earth', 'Mars', 'Saturn', 'Jupyter', 'Venus', null];
const NUMBER_OF_ENTRIES = 60;

main();

interface SampleDataType {
  date: string;
  status: string;
  score: number;
  location: string;
  name: string;
  username: string;
}

async function main() {
  const currentDirName = new URL(import.meta.url).pathname;
  const storyDataPath = path.join(
    currentDirName,
    '../../src/__stories__/resources/story-data.json'
  );

  // Try to just append a field to the JSON, so that we don't break things.
  let existingJson: SampleDataType[] = [];

  try {
    const existingContent = await readFile(storyDataPath, 'utf-8');
    existingJson = JSON.parse(existingContent);
  } catch (err) {
    console.error(err);
  }

  const data = Array.from(new Array(NUMBER_OF_ENTRIES), (_, idx) => ({
    ...getNameAndUsername(idx),
    date: getRandomDateWithinOneMonth(),
    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    score: getRandomScore(),
    location: getRandomPlanet()
  }));

  // Append new fields to the existing JSON.
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const rowKeys = Object.keys(row) as (keyof SampleDataType)[];

    for (const key of rowKeys) {
      if (existingJson[i][key] === undefined) {
        (existingJson[i] as any)[key] = data[i][key];
      }
    }
  }

  await writeFile(storyDataPath, JSON.stringify(existingJson), 'utf-8');
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
