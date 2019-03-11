using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PariwisataWamena.Models;

namespace PariwisataWamena.DataAccess {
    public class UserDTO : IUserDTO<user> {
        public Task<bool> Delete (int id) {
            try {
                using (var db = new DbContext ()) {
                    var result = db.Users.Delete (o => o.iduser == id);
                    return Task.FromResult (result);
                }
            } catch (Exception ex) {
                throw new SystemException (ex.Message);
            }
        }

        public Task<IEnumerable<user>> Get () {
            try {
                using (var db = new DbContext ()) {
                    var result = db.Users.Select ();
                    return Task.FromResult<IEnumerable<user>> (result.ToList ());
                }
            } catch (Exception ex) {
                throw new SystemException (ex.Message);
            }
        }

        public Task<user> Get (int id) {
            try {
                using (var db = new DbContext ()) {
                    var result = db.Users.Where (o => o.iduser == id).FirstOrDefault ();
                    return Task.FromResult (result);
                }
            } catch (Exception ex) {
                throw new SystemException (ex.Message);
            }
        }

        public Task<user> GetByUserName (string usernama) {
            try {
                using (var db = new DbContext ()) {
                    var result = db.Users.Where (o => o.username == usernama).FirstOrDefault ();
                    return Task.FromResult (result);
                }
            } catch (Exception ex) {
                throw new SystemException (ex.Message);
            }
        }

        public Task<IEnumerable<role>> GetRoles (int userId) {
            try {
                using (var db = new DbContext ()) {
                    var roles = from a in db.UserRoles.Where (x => x.iduser == userId)
                    join b in db.Roles.Select () on a.idrole equals b.idrole
                    select b;
                    return Task.FromResult<IEnumerable<role>> (roles.ToList ());
                }
            } catch (Exception ex) {
                throw new SystemException (ex.Message);
            }
        }

        public async Task<bool> IsRole (int userid, string role) {
            var roles = await this.GetRoles (userid);
            var result = roles.Where (x => x.name.ToUpper () == role.ToUpper ()).FirstOrDefault ();
            if (result != null)
                return true;
            return false;
        }

        public Task<user> Post (user t) {
            try {
                using (var db = new DbContext ()) {
                    t.iduser = db.Users.InsertAndGetLastID (t);
                    if (t.iduser <= 0)
                        throw new SystemException ("Not Saved");
                    return Task.FromResult (t);
                }
            } catch (Exception ex) {
                throw new SystemException (ex.Message);
            }
        }

        public Task<user> Put (int id, user t) {
            using (var db = new DbContext ()) {
                try {
                    var updated = db.Users.Update (x => new { x.username, x.avatar, x.password }, t, x => x.iduser == id);
                    if (!updated)
                        throw new SystemException ("Not Saved");
                    return Task.FromResult (t);
                } catch (System.Exception) {

                    throw;
                }
            }
        }
    }

    interface IUserDTO<T> : IDataAccess<T> where T : class {
        Task<bool> IsRole (int userid, string role);
        Task<T> GetByUserName (string usernama);

        Task<IEnumerable<role>> GetRoles (int userId);

    }
}