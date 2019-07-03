using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class addTodoInitData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "TodoId", "Description", "IsDone", "ParentId", "PersonId", "Title" },
                values: new object[] { 1, "Description 1", false, null, "11111111111", "Title 1" });

            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "TodoId", "Description", "IsDone", "ParentId", "PersonId", "Title" },
                values: new object[] { 2, "Description 2", false, null, "22222222222", "Title 2" });

            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "TodoId", "Description", "IsDone", "ParentId", "PersonId", "Title" },
                values: new object[] { 3, "Description 3", false, 1, "11111111111", "Title 3" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "TodoId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "TodoId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "TodoId",
                keyValue: 1);
        }
    }
}
