using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Repository
{
    public interface IRepository<T>
    {
        Task<T> AddItemAsync(T item);
        Task RemoveItemAsync(int id);
        Task<List<T>> GetAllItemsAsync();
        Task<T> UpdateItemAsync(int id, T item);
    }
}
