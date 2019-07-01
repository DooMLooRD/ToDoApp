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
            _toDoListContext = toDoListContext;
        }



        public async Task<task> AddNewTask(task Task)
        {
            await _toDoListContext.Tasks.AddAsync(Task);
            await _toDoListContext.SaveChangesAsync();

            return Task;
        }

    }


    }


        public async Task<List<task>> GetAllTasks()
        {
            return await _toDoListContext.Tasks.AsNoTracking().ToListAsync();
        }
    }
}
>>>>>>> 1f087d06640d127d7a2a8efa98ef047b5ed270f5
