using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RentCarApi.Models
{
  public class IUser
  {
    [Required]
    public int RequestId { get; set; }
  }
}