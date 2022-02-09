import { execa } from 'execa';
import { setFailed } from '@actions/core';

(async () => {
  const { stdout } = await execa('git', ['diff', '--name-only']);
  const arrayOfDirs = stdout.split('\n');
  const hasApiDocsChanges = arrayOfDirs.find((dir) => dir.startsWith('api'));

  if (hasApiDocsChanges && process.env.CI) {
    setFailed(
      'There were changes in the `api` folder. Please re-generate the API docs by doing `yarn typedoc`.'
    );
  }
})();
