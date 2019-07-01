using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class ToDoListContext: DbContext
    {
        public ToDoListContext(DbContextOptions<ToDoListContext> options) : base(options)
        {

        }

        public DbSet<Task> Tasks { get; set; }

    }
}
