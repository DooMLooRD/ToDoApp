using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class addIdsIntoTodoEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Todos_ParentTodoId",
                table: "Todos");

            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Persons_PersonPesel",
                table: "Todos");

            migrationBuilder.DropIndex(
                name: "IX_Todos_ParentTodoId",
                table: "Todos");

            migrationBuilder.DropIndex(
                name: "IX_Todos_PersonPesel",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "ParentTodoId",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "PersonPesel",
                table: "Todos");

            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "Todos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PersonId",
                table: "Todos",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Todos_ParentId",
                table: "Todos",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Todos_PersonId",
                table: "Todos",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Todos_ParentId",
                table: "Todos",
                column: "ParentId",
                principalTable: "Todos",
                principalColumn: "TodoId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Persons_PersonId",
                table: "Todos",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Pesel",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Todos_ParentId",
                table: "Todos");

            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Persons_PersonId",
                table: "Todos");

            migrationBuilder.DropIndex(
                name: "IX_Todos_ParentId",
                table: "Todos");

            migrationBuilder.DropIndex(
                name: "IX_Todos_PersonId",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "PersonId",
                table: "Todos");

            migrationBuilder.AddColumn<int>(
                name: "ParentTodoId",
                table: "Todos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PersonPesel",
                table: "Todos",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Todos_ParentTodoId",
                table: "Todos",
                column: "ParentTodoId");

            migrationBuilder.CreateIndex(
                name: "IX_Todos_PersonPesel",
                table: "Todos",
                column: "PersonPesel");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Todos_ParentTodoId",
                table: "Todos",
                column: "ParentTodoId",
                principalTable: "Todos",
                principalColumn: "TodoId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Persons_PersonPesel",
                table: "Todos",
                column: "PersonPesel",
                principalTable: "Persons",
                principalColumn: "Pesel",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
