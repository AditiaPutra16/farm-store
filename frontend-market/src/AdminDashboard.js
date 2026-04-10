import { useEffect, useState } from "react";
import API from "./api";

function AdminDashboard({ setToken }) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ambil data produk
  const getProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  // ambil produk by id
  const getProduct = async (id) => {
    try {
      const res = await API.get(`/products/${id}`);
      const product = res.data;
      console.log("Product data:", product);
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setImagePreview(`http://localhost:3000/uploads/${product.image}`);
      setEditId(id);
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Gagal mengambil data produk");
    }
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
    setImagePreview(null);
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
      <input
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Harga"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      {imagePreview && <img src={imagePreview} alt="Preview" width="150" />}
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
          if (e.target.files[0])
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
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

          <button onClick={() => getProduct(p.id)}>Edit</button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
