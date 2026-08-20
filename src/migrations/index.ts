import * as migration_20260818_023707 from './20260818_023707';
import * as migration_20260819_000000_add_indexes from './20260819_000000_add_indexes';
import * as migration_20260820_000000_add_product_fields from './20260820_000000_add_product_fields';

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
  {
    up: migration_20260820_000000_add_product_fields.up,
    down: migration_20260820_000000_add_product_fields.down,
    name: '20260820_000000_add_product_fields'
  },
];
