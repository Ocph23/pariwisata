using System.Threading.Tasks;
using System.Security.Cryptography.X509Certificates;
using PariwisataWamena.Models;
using System.Collections.Generic;
using PariwisataWamena.Services;

namespace PariwisataWamena.DataAccess
{
    public class AgentDataAccess: IDataAccess<agent> {
        private DbContext context = new DbContext ();
        public Task<bool> Delete (int id) {
            throw new System.NotImplementedException ();
        }

        public Task<IEnumerable<agent>> Get () {
            try {
                return Task.FromResult<IEnumerable<agent>> (context.Agent.Select ());
            } catch (System.Exception) {

                throw;
            }
        }

        public Task<agent> Get (int id) {
            try {
                return Task.FromResult (context.Agent.Find (x => x.idagent == id));
            } catch (System.Exception) {

                throw;
            }
        }

        public async Task<agent> Post (agent t) {
            using (var db = new DbContext ()) {
                var trans = db.BeginTransaction ();
                try {

                    t.idagent = db.Agent.InsertAndGetLastID (t);
                    if (t.idagent <= 0)
                        throw new System.Exception ();

                    
                    UserService userService = new UserService ();
                    string password = "AgentPassword";
                    User user = await userService.Create (new User { username = t.email, password = password }, password);

                    if(user==null)
                        throw new System.Exception ("Create User Error");
                    
                    string roleName="agent";
                    UserRoleServices userRoleService = new UserRoleServices();
                    if(!await userRoleService.RoleExsistsAsync(roleName))
                            await userRoleService.CreateRoleAsync(roleName);
                    role roleItem=db.Roles.Find(x=>x.name==roleName);

                    if(roleItem==null)
                        throw new System.Exception($"Role {roleName} Not Found");
                   
                    if(!await userRoleService.AddUserInRoleAsync(user,roleName))
                        throw new System.Exception($"Error Add User To role  {roleName}");

                    var emailService = new EmailServices();
                    await emailService.SendAsync( new IdentityMessage{Destination = t.email, 
                    Subject = "Verification Email", Body=$"User Name : {t.email} </br> Password:{password}" });
                    
                    trans.Commit();

                    return t;

                } catch (System.Exception ex) {
                    trans.Rollback();
                    throw new System.Exception(ex.Message);
                }
            }
        }

        public Task<bool> Put (int id, agent t) {
            using (var db = new DbContext())
            {
                if(db.Agent.Update(x=> new {x.address,x.contactName,x.name,x.telepon},t,x=>x.idagent==t.idagent))
                {
                    return Task.FromResult(true);
                }
                return Task.FromResult(false);
            }
        }
    }
}