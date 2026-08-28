using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RequestManagement.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRequestDepartment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Department",
                table: "Requests");

            migrationBuilder.AddColumn<int>(
                name: "DepartmentId",
                table: "Requests",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_DepartmentId",
                table: "Requests",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Departments_DepartmentId",
                table: "Requests",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Departments_DepartmentId",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_DepartmentId",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "Requests");

            migrationBuilder.AddColumn<string>(
                name: "Department",
                table: "Requests",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
