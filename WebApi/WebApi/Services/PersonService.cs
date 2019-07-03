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
            int imonth = Int32.Parse(month);
            int iday = Int32.Parse(day);

            if(person.Pesel.Length!=11)
            {
                throw new Exception("Pesel must contains 11 characters");
            }
            else if(imonth >= 21 && imonth <=32)
            {
                imonth = imonth - 20;
                iyear = iyear + 2000;
            }
            else if(imonth>=01 && imonth <=12)
            {
                iyear = iyear + 1900;
            }
            else
            {
                throw new Exception("There is no matching function to pull out date from pesel");
            }

            person.BirthDate = new DateTime(iyear, imonth, iday, 0, 0, 0);
            return await _personRepository.AddPerson(person);

        }

    }


   
   


}
