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

        public async Task<List<task>> GetAllTasks()
        {
            return await _toDoListContext.Tasks.AsNoTracking().ToListAsync();
        }

        public async Task DeleteTask(int id)
        {
            task _task = await _toDoListContext.Tasks.SingleOrDefaultAsync(t => t.taskId == id);
            if (_task == null)
                throw new ArgumentNullException("There's no task with such an id");
            _toDoListContext.Tasks.Remove(_task);
            await _toDoListContext.SaveChangesAsync();
        }

        public async Task<task> UpdateTask(int id, task _task)
        {
            task _task1 = await _toDoListContext.Tasks.SingleOrDefaultAsync(t => t.taskId == id);
            if(_task1==null)
                throw new ArgumentNullException("There's no task with such an id");
            _task1.Description = _task.Description;
            _task1.Title = _task.Title;
            _task1.isDone = _task.isDone;
            await _toDoListContext.SaveChangesAsync();
            return _task1;
        }
    }
}

