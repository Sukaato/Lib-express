import { lib_express } from "../../connection/dbConnection";
import { users as u } from "../../tableModels/users";
import { roles as r } from "../../tableModels/roles";

/**
 * 
 * @param {string} login 
 * @returns {Promise<{id_users: number, login: string, pswd_users: string, role: string}>}
 */
export const getUserByLogin = async (login) => {
  return new Promise((resolve, reject) => {
    if (login && typeof login === "string") {
      lib_express.query(
        `SELECT ${u.id}, ${u.login}, ${u.password}, ${r.name} FROM ${u.table} 
          LEFT JOIN ${r.table} ON ${u.id_role}=${r.id} 
          WHERE ${u.login}='${login}';`,

        (err, rows, fields) => {
          if (err) {
            throw err;
          }
          console.log(fields);

          return resolve(rows[0]);
        }
      );
    } else {
      throw "Please enter an login";
    }
  });
};