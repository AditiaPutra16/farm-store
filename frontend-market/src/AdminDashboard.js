import { useEffect, useState } from "react";
import API from "./api";

function AdminDashboard({ setToken }) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);

  // ambil data produk
  const getProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // tambah produk
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);

    if (editId) {
      await API.put(`/products/${editId}`, formData);
      alert("Produk diupdate");
    } else {
      await API.post("/products", formData);
      alert("Produk ditambahkan");
    }

    setName("");
    setPrice("");
    setStock("");
    setImage(null);
    setEditId(null);

    getProducts();
  };

  // hapus produk
  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    getProducts();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
      >
        Logout
      </button>

      <hr />

      <h3>Tambah Produk</h3>
      <input placeholder="Nama" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Harga" onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Stock" onChange={(e) => setStock(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleSave}>{editId ? "Update" : "Tambah"}</button>

      <hr />

      <h3>List Produk</h3>
      {products.map((p) => (
        <div key={p.id}>
          <img
            src={`http://localhost:3000/uploads/${p.image}`}
            alt={p.name}
            width="150"
          />
          <h4>{p.name}</h4>
          <p>{p.price}</p>
          <p>{p.stock}</p>

          <button onClick={() => handleDelete(p.id)}>Hapus</button>

          <button
            onClick={() => {
              setEditId(p.id);
              setName(p.name);
              setPrice(p.price);
              setStock(p.stock);
            }}
          >
            Edit
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
