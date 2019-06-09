using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
  public class BLBranches
  {

    public static List<Branch> getBranches()
    {
      using (CarRentEntities db = new CarRentEntities())
      {
         return db.Branches.ToList();
      }
    }
  }
}
