using LuftBorn.API.IService;
using LuftBorn.API.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace LuftBorn.API.Service
{
    public class UserService : IUserService
    {
        private readonly List<User> _users;
        public UserService()
        {
            _users = new List<User>
            {
                new User { Id = 1 , Email = "atweedy0@amazon.de" , Password = "83SzvLWrULh" , Firstname = "Cunégonde" , Lastname = "Tweedy" },
                new User { Id = 2 , Email = "alambourn1@dot.gov" , Password = "6cNQbXINAA" , Firstname = "Laïla" , Lastname = "Lambourn"},
                new User { Id = 3 , Email = "cdobeson2@washington.edu" , Password = "dd0LFvivc" , Firstname = "Adélie" , Lastname = "Dobeson"},
                new User { Id = 4 , Email = "sbandiera3@smh.com.au" , Password = "PEXVLg7J" , Firstname = "Chloé" , Lastname = "Bandiera"},
                new User { Id = 5 , Email = "theineking4@webeden.co.uk" , Password = "CyG3C3xYZg" , Firstname = "Ruì" , Lastname = "Heineking"},
                new User { Id = 6 , Email = "fvollam5@tumblr.com" , Password = "5vSTw94FleK" , Firstname = "Maïlis" , Lastname = "Vollam"},
                new User { Id = 7 , Email = "gmorgans6@time.com" , Password = "PSBbjW24" , Firstname = "Hélène" , Lastname = "Morgans"}
            };
        }

        public ResponseMessage AddUser(User model)
        {
            bool isExist = _users.Any(a => a.Email.Equals(model.Email) && a.Password.Equals(model.Password));
            if (isExist)
            {
                return new ResponseMessage { Code = 0, Message = $"{model.Firstname + " " + model.Lastname} Inserted Before" };
            }
            _users.Add(model);
            return new ResponseMessage { Code = 1, Message = $"{model.Firstname + " " + model.Lastname} Inserted" };
        }

        public ResponseMessage DeleteUser(int id)
        {
            var user = _users.FirstOrDefault(a => a.Id == id);
            if (user != null)
            {
                _users.Remove(user);
                return new ResponseMessage { Code = 1, Message = $"{user.Firstname + " " + user.Lastname} Deleted" };
            }
            return new ResponseMessage { Code = 0, Message = $"There were no data for this User No : {id}" };
        }

        public ResponseMessage EditUser(User model)
        {
            var user = _users.FirstOrDefault(a => a.Id == model.Id);
            if (user != null)
            {
                user.Firstname = model.Firstname;
                user.Lastname = model.Lastname;
                user.Email = model.Email;
                user.Password = model.Password;

                return new ResponseMessage { Code = 1, Message = $"{user.Firstname + " " + user.Lastname} Updated" };

            }
            return new ResponseMessage { Code = 0, Message = $"Invalid User Id : {model.Id}" };
        }

        public ResponseMessage GetLogin(string email, string password)
        {
            bool isExist = _users.Any(a => a.Email.Equals(email) && a.Password.Equals(password));
            if (isExist)
            {
                var user = _users.FirstOrDefault(a => a.Email.Equals(email) && a.Password.Equals(password));
                return new ResponseMessage { Code = 1, Message = $"{JsonConvert.SerializeObject(user)}" };
            }
            return new ResponseMessage { Code = 0, Message = "Invalid Username / password" };

        }

        public User GetSingleUser(int id)
        {
            return _users.FirstOrDefault(a => a.Id == id);
        }

        public IEnumerable<User> GetUsers()
        {
            return _users.ToList();
        }
    }
}
