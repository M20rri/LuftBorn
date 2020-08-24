using LuftBorn.API.Models;
using System.Collections.Generic;

namespace LuftBorn.API.IService
{
    public interface IUserService
    {
        ResponseMessage GetLogin(string email, string password);
        ResponseMessage AddUser(User model);
        ResponseMessage EditUser(User model);
        ResponseMessage DeleteUser(int id);
        User GetSingleUser(int id);
        IEnumerable<User> GetUsers();
    }
}
