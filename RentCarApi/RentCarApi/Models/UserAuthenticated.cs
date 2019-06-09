using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RentCarApi.Models
{
  public class UserAuthenticated
  {
    [Required(AllowEmptyStrings = false)]
    public string password { get; set; }
    [Required(AllowEmptyStrings = false)]
    public string email { get; set; }
  }
}