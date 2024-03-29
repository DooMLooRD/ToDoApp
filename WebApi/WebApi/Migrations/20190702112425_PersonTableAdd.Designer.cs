﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.Model;

namespace WebApi.Migrations
{
    [DbContext(typeof(ToDoListContext))]
    [Migration("20190702112425_PersonTableAdd")]
    partial class PersonTableAdd
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApi.Model.Person", b =>
                {
                    b.Property<string>("Pesel")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<string>("Surname");

                    b.HasKey("Pesel");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("WebApi.Model.Todo", b =>
                {
                    b.Property<int>("TodoId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<bool>("IsDone");

                    b.Property<string>("PersonPesel")
                        .IsRequired();

                    b.Property<string>("Title");

                    b.HasKey("TodoId");

                    b.HasIndex("PersonPesel");

                    b.ToTable("Todos");
                });

            modelBuilder.Entity("WebApi.Model.Todo", b =>
                {
                    b.HasOne("WebApi.Model.Person", "Person")
                        .WithMany("Todos")
                        .HasForeignKey("PersonPesel")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
