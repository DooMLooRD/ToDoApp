using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Model;

namespace WebApi.Repository
{
    public class PersonRepository : IPersonRepository<Person>
    {
       
        private ToDoListContext _dbContext;
        public PersonRepository(ToDoListContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async  Task<Person>AddPerson(Person person)
        {
            await _dbContext.Persons.AddAsync(person);
            await _dbContext.SaveChangesAsync();
            return person;
        }

        public async Task<List<Person>> GetAllItems()
        {
            return await _dbContext.Persons.ToListAsync();
        }

        public async Task RemovePerson(string pesel)
        {

            Person person = await _dbContext.Persons.SingleOrDefaultAsync(p => p.Pesel == pesel);
            if ( person == null)
                throw new ArgumentNullException("There's no person with such pesel");
            _dbContext.Persons.Remove(person);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Person> UpdatePerson(string pesel, Person person)
        {
            if (pesel != person.Pesel)
            {
                throw new ArgumentNullException("Given pesel does not exist.");
            }
            Person per = await _dbContext.Persons.AsNoTracking().SingleOrDefaultAsync(p => p.Pesel == pesel);
            if (per == null)
                throw new ArgumentNullException("There's no person with such pesel");
            _dbContext.Update(person);
            await _dbContext.SaveChangesAsync();
            return person;
        }


        public async Task<Person> GetItem(string pesel)
        {
            Person per = await _dbContext.Persons.SingleOrDefaultAsync(p => p.Pesel == pesel);

            if (per == null)
                throw new ArgumentNullException("There's no person with such pesel");

            return per;
        }


    }
}
