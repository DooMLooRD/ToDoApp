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
            if (_dbContext.Persons.AsNoTracking().FirstOrDefault(e => e.Pesel == item.PersonId) == null)
            {
                throw new ArgumentException("User with given pesel does not exist.");
            }
            await _dbContext.Todos.AddAsync(item);
            await _dbContext.SaveChangesAsync();
            _dbContext.Entry(item).Reference(c => c.Person).Load();
            return item;
        }

        public async Task<List<Todo>> GetAllItemsAsync()
        {
            return await _dbContext.Todos.Include(p => p.Person).ToListAsync();

        }

        public async Task<List<Todo>> GetAllChildItemsAsync(Todo toDo)
        {
            return await _dbContext.Todos.Include(p => p.Person).Where(p => p.Parent.TodoId == toDo.TodoId).ToListAsync();
        }

        public async Task RemoveItemAsync(int id)
        {
            Todo todo = await _dbContext.Todos.SingleOrDefaultAsync(t => t.TodoId == id);
            if (todo == null)
                throw new ArgumentNullException("There's no task with such an id");
            await RemoveParenWithChildren(todo);
            await _dbContext.SaveChangesAsync();
        }

        private async Task RemoveParenWithChildren(Todo todo)
        {
            List<Todo> children = await GetAllChildItemsAsync(todo);
            if (children != null && children.Count > 0)
            {
                foreach (Todo child in children)
                {
                    await RemoveParenWithChildren(child);
                }
            }
            _dbContext.Todos.Remove(todo);
        }

        public async Task<Todo> UpdateItemAsync(int id, Todo item)
        {
            if (id != item.TodoId)
            {
                throw new ArgumentNullException("Given ids are not valid.");
            }
            Todo todo = await _dbContext.Todos.AsNoTracking().SingleOrDefaultAsync(t => t.TodoId == id);
            if (todo == null)
                throw new ArgumentNullException("There's no task with such an id");
            _dbContext.Entry(item).Property(c => c.Title).IsModified = true;
            _dbContext.Entry(item).Property(c => c.Description).IsModified = true;

            await _dbContext.SaveChangesAsync();
            return item;
        }



        public async Task<Person> AddItemAsync(Person person)
        {
            await _dbContext.Persons.AddAsync(person);
            await _dbContext.SaveChangesAsync();

            return person;
        }




    }
}
