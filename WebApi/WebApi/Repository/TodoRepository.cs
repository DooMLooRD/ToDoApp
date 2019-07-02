using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Model;

namespace WebApi.Repository
{
    public class TodoRepository : IRepository<Todo>
    {
        private ToDoListContext _dbContext;
        public TodoRepository(ToDoListContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Todo> AddItemAsync(Todo item)
        {
            await _dbContext.Todos.AddAsync(item);
            await _dbContext.SaveChangesAsync();

            return item;
        }

        public async Task<List<Todo>> GetAllItemsAsync()
        {
            return await _dbContext.Todos.AsNoTracking().ToListAsync();

        }

        public async Task RemoveItemAsync(int id)
        {
            Todo todo = await _dbContext.Todos.SingleOrDefaultAsync(t => t.TodoId == id);
            if (todo == null)
                throw new ArgumentNullException("There's no task with such an id");
            _dbContext.Todos.Remove(todo);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Todo> UpdateItemAsync(int id, Todo item)
        {
            if(id!= item.TodoId)
            {
                throw new ArgumentNullException("Given ids are not valid.");
            }
            Todo todo = await _dbContext.Todos.AsNoTracking().SingleOrDefaultAsync(t => t.TodoId == id);
            if (todo == null)
                throw new ArgumentNullException("There's no task with such an id");
            _dbContext.Update(item);
             await _dbContext.SaveChangesAsync();
            return item;
        }

    }
}
