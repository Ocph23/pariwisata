using System.Runtime.CompilerServices;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PariwisataWamena.Models;
using PariwisataWamena.Services;

namespace PariwisataWamena.DataAccess {
    public class LayananDataAccess {
        private int agentId;

        public LayananDataAccess(int agentid)
        {
            this.agentId=agentid;
        }

        public Task<layanan> CretaLayanan(layanan data ){
            using(var db = new DbContext())
            {
                try
                {
                    data.idservice = db.Layanan.InsertAndGetLastID(data);
                    if(data.idservice<=0)
                    throw new System.Exception("Data Not Saved");
                    else
                    return Task.FromResult(data);

                }
                catch (System.Exception ex)
                {
                    
                    throw new System.Exception(ex.Message);
                }
            }
        }
        
        public Task<bool> UpdateLayanan(layanan data ){
            using(var db = new DbContext())
            {
                try
                {
                    var saved= db.Layanan.Update(x=> new{x.content,x.price},data,x=>x.idservice==data.idservice);
                    if(!saved)
                        throw new System.Exception("Data Not Saved");
                    else
                        return Task.FromResult(true);

                }
                catch (System.Exception ex)
                {
                    throw new System.Exception(ex.Message);
                }
            }
        }
    }
}