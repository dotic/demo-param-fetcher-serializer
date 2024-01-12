import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1689682616941 implements MigrationInterface {
  name = 'Migration1689682616941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "person" ("email" character varying(255) NOT NULL, "givenName" character varying(255) NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "surname" character varying(255) NOT NULL, CONSTRAINT "UQ_d2d717efd90709ebd3cb26b936c" UNIQUE ("email"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "person" ("email", "givenName", "id", "surname") VALUES ('admin@email.com', 'Fetcher', 'e5ce4fdb-1a02-44d9-a9cc-26f48bef26ee', 'Fetch')`,
    );
    await queryRunner.query(
      `INSERT INTO "person" VALUES ('user@email.com', 'Param', '3827a8dc-d84d-4711-a934-9da17e859669', 'Pr')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "person"`);
  }
}
