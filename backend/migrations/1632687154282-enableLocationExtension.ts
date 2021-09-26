import { MigrationInterface, QueryRunner } from 'typeorm';

export class enableLocationExtension1632687154282
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create extension cube;
    create extension earthdistance;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop extension if exists earthdistance;
      drop extension if exists cube;`);
  }
}
