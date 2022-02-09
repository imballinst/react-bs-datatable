import { execa } from 'execa';
import { setFailed } from '@actions/core';

(async () => {
  const result = await execa('git', ['diff']);
  console.log(result.stdout);
  if (result.stdout && process.env.CI) {
    setFailed(
      'There were changes in the `api` folder. Please re-generate the API docs by doing `yarn typedoc`.'
    );
  }
})();
