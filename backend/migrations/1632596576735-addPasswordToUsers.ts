import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addPasswordToUsers1632596576735 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'password',
        isNullable: false,
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'password');
  }
}
