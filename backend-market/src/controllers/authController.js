const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM admins WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) return res.json(err);

      if (result.length === 0) {
        return res.status(401).json("Username tidak ditemukan");
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json("Password salah");
      }

      const token = jwt.sign({ id: user.id }, "SECRET_KEY", {
        expiresIn: "1d"
      });

      res.json({ token });
    }
  );
};
