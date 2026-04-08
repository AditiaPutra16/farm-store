const db = require("../config/db");

exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
};

exports.createProduct = (req, res) => {
  const { name, price, stock } = req.body;
  db.query(
    "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
    [name, price, stock],
    (err, result) => {
      if (err) return res.json(err);
      res.json("Product added");
    }
  );
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  db.query(
    "UPDATE products SET name=?, price=?, stock=? WHERE id=?",
    [name, price, stock, id],
    (err, result) => {
      if (err) return res.json(err);
      res.json("Product updated");
    }
  );
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
    if (err) return res.json(err);
    res.json("Product deleted");
  });
};
