using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PariwisataWamena.Models;
using System.Linq;

namespace PariwisataWamena.DataAccess
{
    public class ArticleDataAccess : IDataAccess<article>
    {
        public Task<bool> Delete(int id)
        {
            using (var db = new DbContext())
            {
                try
                {
                    var deleted = db.Article.Delete(x => x.idarticle == id);
                    return Task.FromResult(deleted);
                }
                catch (Exception ex)
                {

                    throw new SystemException(ex.Message);
                }
            }
        }

        public Task<IEnumerable<article>> Get()
        {
            using (var db = new DbContext())
            {
                try
                {
                    var result = from a in db.Article.Select()
                                 join b in db.Users.Select() on a.iduser equals b.iduser
                                 select new article
                                 {
                                     title = a.title, 
                                     content = a.content,
                                     createdate = a.createdate,
                                     status = a.status,
                                     idarticle = a.idarticle,
                                     iduser = a.iduser,
                                     thumb = a.thumb,
                                     type = a.type,
                                     user = b,
                                     draft = a.draft
                                 };

                    return Task.FromResult<IEnumerable<article>>(result.ToList());
                }
                catch (System.Exception)
                {

                    throw;
                }
            }
        }

        public Task<article> Get(int id)
        {
            using (var db = new DbContext())
            {
                try
                {
                    var result = from a in db.Article.Where(x => x.idarticle == id)
                                 join b in db.Users.Select() on a.iduser equals b.iduser
                                 select new article
                                 {
                                     title = a.title,
                                     content = a.content,
                                     createdate = a.createdate,
                                     status = a.status,
                                     idarticle = a.idarticle,
                                     iduser = a.iduser,
                                     thumb = a.thumb,
                                     type = a.type,
                                     user = b,
                                     draft = a.draft
                                 };

                    return Task.FromResult(result.FirstOrDefault());
                }
                catch (System.Exception)
                {

                    throw;
                }
            }
        }

        public Task<article> Post(article t)
        {
            using (var db = new DbContext())
            {
                try
                {
                    t.idarticle = db.Article.InsertAndGetLastID(t);
                    if (t.idarticle <= 0)
                        throw new SystemException("Not Saved");
                    return Task.FromResult(t);
                }
                catch (System.Exception ex)
                {
                    throw new SystemException(ex.Message);
                }
            }
        }

        public Task<bool> Put(int id, article t)
        {
            using (var db = new DbContext())
            {
                try
                {
                    if (db.Article.Update(x => new { x.content, x.createdate, x.draft, x.iduser, x.status, x.thumb, x.title, x.type }, t, x => x.idarticle == id))
                        return Task.FromResult(true);

                    throw new SystemException("Not Saved");
                }
                catch (System.Exception ex)
                {
                    throw new SystemException(ex.Message);
                }
            }
        }

    }
}