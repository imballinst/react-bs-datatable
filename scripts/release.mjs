// @ts-check
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const PACKAGE_JSON = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8')
);

const { name, version } = PACKAGE_JSON;
let isSkipRelease = false;

try {
  const output = execSync(`npm dist-tag ${name}`).toString();
  const latestTag = output.match(/latest: (\d+\.\d+\.\d+)/);

  if (version === latestTag?.[1]) {
    isSkipRelease = true;
  }
} catch (err) {
  // No-op.
}

if (!isSkipRelease) {
  // If number of publishable packages is not equal to excluded packages,
  // then we run the release process.
  console.info('Running: create .npmrc');
  fs.writeFileSync(
    path.join(process.cwd(), '.npmrc'),
    `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}`,
    'utf-8'
  );

  console.info('Running: yarn build');
  execSync('yarn build', { stdio: 'inherit' });

  console.info('Running: yarn changeset publish');
  execSync('yarn changeset publish', { stdio: 'inherit' });
} else {
  console.info('No packages to be published. Skipping process...');
}
