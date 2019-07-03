using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class AddLoginData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Login",
                table: "Persons",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Persons",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "Persons",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Login",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "Persons");
        }
    }
}
