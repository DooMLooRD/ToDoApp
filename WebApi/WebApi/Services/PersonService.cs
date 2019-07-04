using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApi.Helpers;
using WebApi.Model;
using WebApi.Repository;
using WebApi.Services.DTOs;

namespace WebApi.Services
{
    public class PersonService:ToDoDTO
    {
        private IPersonRepository<Person> _personRepository;

        private readonly AppSettings _appSettings;

        public PersonService(IPersonRepository<Person> personRepository, IOptions<AppSettings> appSettings)
        {

            _personRepository = personRepository;
            _appSettings = appSettings.Value;
        }

        public async Task<Person> FindPerson(string pesel)
        {
   
            return await _personRepository.GetItem(pesel);
        }

        public async Task<List<Person>> AllPersons()
        {

            return await _personRepository.GetAllItems();
        }


        public async Task<Person> AddNewPerson(Person person)
        {

            string year = person.Pesel.Substring(0, 2); 
            string month = person.Pesel.Substring(2,2);
            string day = person.Pesel.Substring(4,2);
            int iyear = int.Parse(year);
            int imonth = int.Parse(month);
            int iday = int.Parse(day);

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
        public async Task<Person> Authenticate(string login, string password)
        {
            var user = (await _personRepository.GetAllItems()).SingleOrDefault(t => t.Login == login && t.Password == password);
            if (user == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Pass);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Pesel.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            user.Password = null;

            return user;
        }

        public async Task<IEnumerable<Person>> GetAllWithoutPassword()
        {
            return (await _personRepository.GetAllItems()).Select(t =>
            {
                t.Password = null;
                return t;
            });
        }

    }


   
   


}
