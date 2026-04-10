const db = require("../config/db");

exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
};

exports.getProduct = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id=?", [id], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json(result[0]);
  });
};

exports.createProduct = (req, res) => {
  const { name, price, stock } = req.body;
  const image = req.file ? req.file.filename : null;

  db.query(
    "INSERT INTO products (name, price, stock, image) VALUES (?, ?, ?, ?)",
    [name, price, stock, image],
    (err) => {
      if (err) return res.json(err);
      res.json("Product added");
    }
  );
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  const image = req.file ? req.file.filename : null;

  let query = "UPDATE products SET name=?, price=?, stock=?";
  let params = [name, price, stock];

  if (image) {
    query += ", image=?";
    params.push(image);
  }

  query += " WHERE id=?";
  params.push(id);

  db.query(query, params, (err, result) => {
    if (err) return res.json(err);
    res.json("Product updated");
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
    if (err) return res.json(err);
    res.json("Product deleted");
  });
};
