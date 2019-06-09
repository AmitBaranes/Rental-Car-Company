using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BusinessLayer;
using DataAccessLayer;
using System.Web.Http.Cors;
using RentCarApi.Models;
using RentCarApi.Filters;

namespace RentCarApi.Controllers
{
  [EnableCors(origins: "*", headers: "*", methods: "*")]
  public class UsersController : ApiController
  {

    // http://localhost:8080/api/Users/GetUsers
    //[JwtAuthentication]
    [AllowAnonymous]
    public IHttpActionResult GetUsers()
    {
      try
      {
        List<User> users = BLUsers.getAllUsers();
        if (users != null)
        {
          return Ok(users);
        }
        else
        {
          return NotFound();
        }
      }
      catch
      {
        return InternalServerError();
      }

    }


    // http://localhost:8080/api/Users/getUsersByRole/?RoleEnum=2
    [HttpGet]
    [AllowAnonymous]
    public IHttpActionResult getUsersByRole([FromUri]char roleType)
    {
      try
      {
        List<User> users = BLUsers.getUsersByRole(roleType);
        if (users.Count > 0)
        {
          return Ok(users);
        }
        else
        {
          return NotFound();
        }
      }
      catch
      {
        return InternalServerError();
      }
    }

    //Body : 
    //    {
    //FirstName : "Amit",
    //LastName : "Bar",
    //DateOfBirth : "18-06-12",
    //Email : "dcdcd@cdcd.com",
    //Gender : "Male",
    //IdentityID : 313278565,
    //Image : null,
    //Password : "16485678cdcwewcte748",
    //RoleType : 1}

    // http://localhost:8080/api/Users/addUser
    [HttpPost]
    [AllowAnonymous]
    public IHttpActionResult addUser(User userInfo)
    {
      bool isUserExist = BLUsers.getAllUsers().Any(user => user.ID == userInfo.ID);
      if (!isUserExist)
      {
        try
        {
          BLUsers.addUser(userInfo);
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK, "user created successfully"));
        }
        catch (Exception e)
        {
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to create new user"));
        }
      }
      return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User already exist!"));
    }

    // 
    [Route("api/Users/UpdateUser")]
    [HttpPut]
    [AllowAnonymous]
    public IHttpActionResult UpdateUser([FromBody]User user)
    {
      try
      {
        bool isUpdated = BLUsers.updateUser(user);
        if (isUpdated)
        {
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK, "user updated successfully"));
        }
        return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to update user"));
      }
      catch (Exception e)
      {
        return InternalServerError();
      }
    }


    //http://localhost:8080/api/Users/DeleteUser/?ID=313278236
    [HttpDelete]
    [AllowAnonymous]
    public IHttpActionResult DeleteUser(string ID)
    {
      try
      {
        bool isDeleted = BLUsers.DeleteUser(ID);
        if (isDeleted)
        {
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK, "user Deleted successfully"));
        }
        return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to delete user"));
      }
      catch
      {
        return InternalServerError();
      }

    }

    [AllowAnonymous]
    [HttpPost]
    public IHttpActionResult isAuthenticated(UserAuthenticated userInfo)
    {
      try
      {
        bool Auth = BLUsers.isAuthenticated(userInfo.email, userInfo.password);
        if (Auth)
        {
          User currentUser = BLUsers.getAllUsers().FirstOrDefault(user => user.Email == userInfo.email);
          string fullName = $"{currentUser.FirstName} {currentUser.LastName}";
          var token = jwtManager.GenerateToken(currentUser.UserID.ToString(), fullName,currentUser.RoleType);
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK,token));
        }
        return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "failed to authenticate!"));
      }
      catch(Exception e)
      {
        return InternalServerError();
      }
    }
  }

}
