using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Model;
using Microsoft.EntityFrameworkCore;
namespace WebApi.DataAccessLayer
{
    public class TasksAccessLayer
    {
        private ToDoListContext _toDoListContext;

        public TasksAccessLayer(ToDoListContext toDoListContext)
        {
            this._toDoListContext = toDoListContext;
        }

        public async Task<List<task>> GetAllTasks()
        {
            return await _toDoListContext.Tasks.AsNoTracking().ToListAsync();
        }
    }
}
