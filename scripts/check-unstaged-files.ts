import { execa } from 'execa';

(async () => {
  const result = await execa('git', ['diff']);
  console.log(result.stdout);
})();
