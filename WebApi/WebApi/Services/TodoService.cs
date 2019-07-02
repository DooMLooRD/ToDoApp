using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Model;
using WebApi.Repository;

namespace WebApi.Services
{
    public class TodoService
    {
        private IRepository<Todo> _repository;

        public TodoService(IRepository<Todo> repository)
        {
            _repository = repository;
        }

        public async Task<Todo> AddNewTodo(Todo todo)
        {
            return await _repository.AddItemAsync(todo);

        }

        public async Task<List<Todo>> GetAllTodos()
        {
            return await _repository.GetAllItemsAsync();
        }

        public async Task DeleteTodo(int id)
        {
            await _repository.RemoveItemAsync(id);
        }

        public async Task<Todo> UpdateTodo(int id, Todo todo)
        {
            return await _repository.UpdateItemAsync(id, todo);
        }
    }
}
