using System.Runtime.CompilerServices;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PariwisataWamena.Models;
using PariwisataWamena.Services;
using System;

namespace PariwisataWamena.DataAccess {
    public class LayananDataAccess {
        private int agentId;

        public LayananDataAccess(int agentid)
        {
            this.agentId=agentid;
        }

        public LayananDataAccess()
        {
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

        internal Task<List<layanan>> GetLayanan()
        {
            using(var db = new DbContext())
            {
                var result = db.Layanan.Where(O => O.idagent == this.agentId).ToList();
                return Task.FromResult(result);
            }
        }

        internal Task<List<transaction>> GetTransaction(int serviceId)
        {
            using (var db = new DbContext())
            {
                var result = from a in db.Layanan.Where(o => o.idagent == agentId)
                             join b in db.Transactions.Select() on a.idservice equals b.idservice
                             select b;
                return Task.FromResult( result.ToList());
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

        public Task<bool> ConfirmTransaction(transaction modal)
        {
            using (var db = new DbContext())
            {
                var updated = db.Transactions.Update(O => new { O.count, O.end, O.payment, O.start }, modal, o => o.idtransaction == modal.idtransaction);
                
                return Task.FromResult(updated);
            }
        }
    }
}