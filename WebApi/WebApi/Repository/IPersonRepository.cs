using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Model;

namespace WebApi.Repository
{
    public interface IPersonRepository<Person>
    {
     
        Task RemovePerson(string pesel);
        Task<Person> UpdatePerson(string pesel, Person person);
        Task<Person> AddPerson(Person person);
        Task<List<Person>> GetAllItems();
        Task<Person> GetItem(string pesel);
    }
}
