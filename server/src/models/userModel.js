import pool from "../database/index.js"

const UserModel = {};

/* *****************************
*   Register new account
* *************************** */
UserModel.registerUser = async (username, email, password) => {
  try {
    const sql = "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *"
    return await pool.query(sql, [username, email, password])
  } catch (error) {
    return error.message
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
UserModel.checkExistingEmail = async (email) => {
  try {
    const sql = "SELECT * FROM users WHERE email = $1"
    const email = await pool.query(sql, [email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
* Return account data using email address
* ***************************** */
UserModel.getUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, password_hash FROM users WHERE email = $1',
      [email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

UserModel.getUserById = async (id) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, password_hash FROM users WHERE id = $1',
      [id])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching user ID found")
  }
}

UserModel.updateAccountInfo = async (username, email, id) =>{
  try {
    const sql = 'UPDATE public.users SET username = $1, email = $2 WHERE account_id = $3 RETURNING *'
    const result = await pool.query(sql, [username, email, id])
    return result.rows[0]
  } catch (error) {
    return new Error("Unable to update user information")
  }
} 

UserModel.updatePassword = async (password, id) =>{
  try {
    const sql = 'UPDATE public.users SET password_hash = $1 WHERE id = $2 RETURNING *'
    const result = await pool.query(sql, [password, id])
    return result.rows[0]
  } catch (error) {
    return new Error("Unable to update user password")
  }
}

export default UserModel;