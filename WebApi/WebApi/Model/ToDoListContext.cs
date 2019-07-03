using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class ToDoListContext: DbContext
    {
        public DbSet<Todo> Todos { get; set; }
        public DbSet<Person> Persons { get; set; }

        public ToDoListContext(DbContextOptions<ToDoListContext> options) : base(options)
        {

        }

       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>().HasData(new[]
            {
                new Person
                {
                    Login="admin",
                    Password="admin",
                    Name="Jan",
                    Surname="Kowalski",
                    BirthDate=new DateTime(1997,4,7),
                    Pesel="11111111111"
                },
                new Person
                {
                    Login="krysia",
                    Password="krysia",
                    Name="Krysia",
                    Surname="Kowalska",
                    BirthDate=new DateTime(1997,4,7),
                    Pesel="22222222222"
                },
            });

            modelBuilder.Entity<Todo>(todo =>
            {
                todo.HasOne(c => c.Parent).WithMany().HasForeignKey(c => c.ParentId).IsRequired(false).OnDelete(DeleteBehavior.ClientSetNull);
                todo.HasOne(c => c.Person).WithMany(c=> c.Todos).HasForeignKey(c => c.PersonId).OnDelete(DeleteBehavior.Restrict);
                todo.HasData(new[]
                {
                    new Todo
                    {
                        Title="Title 1",
                        Description= "Description 1",
                        IsDone=false,
                        TodoId=1,
                        ParentId=null,
                        PersonId="11111111111"
                    },
                    new Todo
                    {
                        Title="Title 2",
                        Description= "Description 2",
                        IsDone=false,
                        TodoId=2,
                        ParentId=null,
                        PersonId="22222222222"
                    },
                    new Todo
                    {
                        Title="Title 3",
                        Description= "Description 3",
                        IsDone=false,
                        TodoId=3,
                        ParentId=1,
                        PersonId="11111111111"
                    }
                });
            });
        }

    }
}
