using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class addTodoParent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ParentTodoId",
                table: "Todos",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Todos_ParentTodoId",
                table: "Todos",
                column: "ParentTodoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Todos_ParentTodoId",
                table: "Todos",
                column: "ParentTodoId",
                principalTable: "Todos",
                principalColumn: "TodoId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Todos_ParentTodoId",
                table: "Todos");

            migrationBuilder.DropIndex(
                name: "IX_Todos_ParentTodoId",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "ParentTodoId",
                table: "Todos");
        }
    }
}
