import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class AddUserForeignKey1536075547612 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.addColumn("post", new TableColumn
        ({
            name: "user",
            type: "int",
            isNullable: true

        }));

        await queryRunner.createForeignKey("post", new TableForeignKey({
            columnNames: ["user"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable("post");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("user") !== -1);
        await queryRunner.dropForeignKey("post", foreignKey);
    }

}
