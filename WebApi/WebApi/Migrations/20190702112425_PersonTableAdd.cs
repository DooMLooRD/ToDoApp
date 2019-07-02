using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class PersonTableAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PersonPesel",
                table: "Todos",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    Pesel = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Surname = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.Pesel);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Todos_PersonPesel",
                table: "Todos",
                column: "PersonPesel");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Persons_PersonPesel",
                table: "Todos",
                column: "PersonPesel",
                principalTable: "Persons",
                principalColumn: "Pesel",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Persons_PersonPesel",
                table: "Todos");

            migrationBuilder.DropTable(
                name: "Persons");

            migrationBuilder.DropIndex(
                name: "IX_Todos_PersonPesel",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "PersonPesel",
                table: "Todos");
        }
    }
}
