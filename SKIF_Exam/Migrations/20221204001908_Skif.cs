using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SKIF_Exam.Migrations
{
    public partial class Skif : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "skifs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KnifeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KnifeCost = table.Column<int>(type: "int", nullable: false),
                    KnifeStock = table.Column<int>(type: "int", nullable: false),
                    KnifeSteelHardness = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KnifeSteelGrade = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KnifeLiningMaterial = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KnifeImgUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_skifs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Login = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "skifs");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
