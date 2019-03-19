using System.Collections.Generic;
using System.Threading.Tasks;
namespace PariwisataWamena.DataAccess {
    public interface IDataAccess<T> where T : class {
        Task<IEnumerable<T>> Get ();
        Task<T> Get (int id);
        Task<bool> Put (int id, T t);
        Task<bool> Delete (int id);
        Task<T> Post (T t);
    }

}