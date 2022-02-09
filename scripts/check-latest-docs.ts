import { execa } from 'execa';

(async () => {
  const { stdout } = await execa('git', ['diff', '--name-only']);
  const arrayOfDirs = stdout.split('\n');
  const hasApiDocsChanges = arrayOfDirs.find((dir) => dir.startsWith('api'));

  if (hasApiDocsChanges) {
    throw new Error(
      'There were changes in the `api` folder. Please re-generate the API docs by doing `yarn build:docs`.'
    );
  }
})();
