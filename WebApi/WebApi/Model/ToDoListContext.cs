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
            //modelBuilder.Entity<Person>().HasMany(t => t.Todos)
            //     .WithOne(p => p.Person)
            //     .IsRequired();

            modelBuilder.Entity<Todo>(todo =>
            {
                
                todo.HasOne(c => c.Parent).WithMany().HasForeignKey(c => c.ParentId).IsRequired(false).OnDelete(DeleteBehavior.ClientSetNull);
                todo.HasOne(c => c.Person).WithMany(c=> c.Todos).HasForeignKey(c => c.PersonId).OnDelete(DeleteBehavior.Restrict);
            });
        }

    }
}
