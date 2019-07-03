using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Model;
using WebApi.Repository;
using WebApi.Services.DTOs;

namespace WebApi.Services
{
    public class PersonService:ToDoDTO
    {
        private IPersonRepository<Person> _personRepository;

        public PersonService(IPersonRepository<Person> personRepository)
        {

            _personRepository = personRepository;
        }


        public async Task<Person> FindPerson(string pesel)
        {
   
            return await _personRepository.GetItem(pesel);
        }

        public async Task<Person> AddNewPerson(Person person)
        {
            return await _personRepository.AddPerson(person);

        }

    }


   
   


}
