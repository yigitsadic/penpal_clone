import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addLocationToCity1632685300419 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cities',
      new TableColumn({
        name: 'location',
        type: 'point',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cities', 'location');
  }
}
