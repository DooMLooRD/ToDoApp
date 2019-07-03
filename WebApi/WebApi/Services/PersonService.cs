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

            string currentYear = DateTime.Now.Year.ToString();
            int numberCurrentYear = Int32.Parse(currentYear);
            string textdateOfBirth = person.Pesel.Substring(0,2);
            int numberdateOfBirth = Int32.Parse(textdateOfBirth);
            person.Age = numberCurrentYear - (numberdateOfBirth + 1900);
            return await _personRepository.AddPerson(person);

        }

    }


   
   


}
