import * as migration_20260818_023707 from './20260818_023707';
import * as migration_20260819_000000_add_indexes from './20260819_000000_add_indexes';

export const migrations = [
  {
    up: migration_20260818_023707.up,
    down: migration_20260818_023707.down,
    name: '20260818_023707'
  },
  {
    up: migration_20260819_000000_add_indexes.up,
    down: migration_20260819_000000_add_indexes.down,
    name: '20260819_000000_add_indexes'
  },
];
