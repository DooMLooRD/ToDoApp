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

            string year = person.Pesel.Substring(0, 2); 
            string month = person.Pesel.Substring(2,2);
            string day = person.Pesel.Substring(4,2);
            int iyear = Int32.Parse(year);
            iyear = 1900 + iyear; 
            int imonth = Int32.Parse(month);
            int iday = Int32.Parse(day);
            person.BirthDate = new DateTime(iyear, imonth, iday, 0, 0, 0);
            return await _personRepository.AddPerson(person);

        }

    }


   
   


}
