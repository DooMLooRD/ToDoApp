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
            modelBuilder.Entity<Person>().HasMany(t => t.Todos)
                 .WithOne(p => p.Person)
                 .IsRequired();
        }

    }
}
