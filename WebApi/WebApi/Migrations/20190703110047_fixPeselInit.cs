using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class fixPeselInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Pesel",
                keyValue: "111111111");

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Pesel",
                keyValue: "222222222");

            migrationBuilder.InsertData(
                table: "Persons",
                columns: new[] { "Pesel", "BirthDate", "Login", "Name", "Password", "Surname", "Token" },
                values: new object[] { "11111111111", new DateTime(1997, 4, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "admin", "Jan", "admin", "Kowalski", null });

            migrationBuilder.InsertData(
                table: "Persons",
                columns: new[] { "Pesel", "BirthDate", "Login", "Name", "Password", "Surname", "Token" },
                values: new object[] { "22222222222", new DateTime(1997, 4, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "krysia", "Krysia", "krysia", "Kowalska", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Pesel",
                keyValue: "11111111111");

            migrationBuilder.DeleteData(
                table: "Persons",
                keyColumn: "Pesel",
                keyValue: "22222222222");

            migrationBuilder.InsertData(
                table: "Persons",
                columns: new[] { "Pesel", "BirthDate", "Login", "Name", "Password", "Surname", "Token" },
                values: new object[] { "111111111", new DateTime(1997, 4, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "admin", "Jan", "admin", "Kowalski", null });

            migrationBuilder.InsertData(
                table: "Persons",
                columns: new[] { "Pesel", "BirthDate", "Login", "Name", "Password", "Surname", "Token" },
                values: new object[] { "222222222", new DateTime(1997, 4, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "krysia", "Krysia", "krysia", "Kowalska", null });
        }
    }
}
