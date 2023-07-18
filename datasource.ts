import { DataSource } from 'typeorm';

import { Migration1689682616941 } from './migrations/1689682616941-Migration';
import { Person } from './src/entities/person.entity';

export default new DataSource({
  database: 'postgres',
  entities: [Person],
  host: 'localhost',
  migrations: [Migration1689682616941],
  password: 'postgres',
  port: 5432,
  type: 'postgres',
  username: 'postgres',
});
