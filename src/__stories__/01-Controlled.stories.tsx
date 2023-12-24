import { StoryFn } from '@storybook/react';

import { AsyncTimeoutStoryComponent } from './01-Controlled/00-AsyncTimeout';
import { AsyncPokemonStoryComponent } from './01-Controlled/01-AsyncPokemon';
import { ControlledComposedTableStoryComponent } from './01-Controlled/02-ControlledComposedTable';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Controlled',
  parameters: {
    docs: {
      source: {
        code: null
      }
    }
  }
};

// Async.
const AsyncTimeoutTemplate: StoryFn<typeof AsyncTimeoutStoryComponent> =
  AsyncTimeoutStoryComponent;

export const Async = AsyncTimeoutTemplate.bind({});
Async.storyName = 'Async example (with setTimeout)';

// Async Pokémon.
const AsyncPokemonTemplate: StoryFn<typeof AsyncPokemonStoryComponent> =
  AsyncPokemonStoryComponent;

export const AsyncPokemon = AsyncPokemonTemplate.bind({});
AsyncPokemon.storyName = 'Async example (with Pokémon API)';

// Controlled composed table.
const ControlledComposedTableTemplate: StoryFn<
  typeof ControlledComposedTableStoryComponent
> = ControlledComposedTableStoryComponent;

export const ControlledComposedTable = ControlledComposedTableTemplate.bind({});
ControlledComposedTable.storyName = 'Controlled composed table';
