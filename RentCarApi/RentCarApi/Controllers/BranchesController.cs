using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BL;
using DataAccessLayer;

namespace RentCarApi.Controllers
{
  [EnableCors(origins: "*", headers: "*", methods: "*")]
  public class BranchesController : ApiController
  {
    [HttpGet]
    [AllowAnonymous]
    public IHttpActionResult getBranches()
    {
      try
      {
      List<Branch> cars = BLBranches.getBranches();
      if (cars.Count > 0)
      {
        return Ok(cars);
      }
      else
      {
        return NotFound();
      }
    }
      catch (Exception e)
      {
        return InternalServerError();
  }
}


  }
}
