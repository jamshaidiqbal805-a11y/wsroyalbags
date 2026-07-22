"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function ProductsPage() {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [category, setCategory] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("");

  const [products, setProducts] = useState([]);

  async function loadProducts() {
    const snapshot = await getDocs(collection(db, "products"));

    const list = [];

    snapshot.forEach((docItem) => {
      list.push({
        id: docItem.id,
        ...docItem.data(),
      });
    });

    setProducts(list);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function saveProduct() {
    if (
      productName === "" ||
      productCode === "" ||
      category === "" ||
      purchasePrice === "" ||
      salePrice === "" ||
      stock === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        productName,
        productCode,
        category,
        purchasePrice: Number(purchasePrice),
        salePrice: Number(salePrice),
        stock: Number(stock),
        createdAt: serverTimestamp(),
      });

      setProductName("");
      setProductCode("");
      setCategory("");
      setPurchasePrice("");
      setSalePrice("");
      setStock("");

      loadProducts();

      alert("Product Added Successfully");
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  }

  async function deleteProduct(id) {
    if (!confirm("Delete Product?")) return;

    await deleteDoc(doc(db, "products", id));

    loadProducts();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="bg-white rounded-xl shadow p-6">

        <h1 className="text-4xl font-bold">
          Products Management
        </h1>

        <p className="text-gray-500 mt-2">
          Add New Products
        </p>

      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          className="border rounded-lg p-3"
          placeholder="Product Name"
          value={productName}
          onChange={(e)=>setProductName(e.target.value)}
        />

        <input
          className="border rounded-lg p-3"
          placeholder="Product Code"
          value={productCode}
          onChange={(e)=>setProductCode(e.target.value)}
        />

        <input
          className="border rounded-lg p-3"
          placeholder="Category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />
                <input
          className="border rounded-lg p-3"
          placeholder="Purchase Price"
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />

        <input
          className="border rounded-lg p-3"
          placeholder="Sale Price"
          type="number"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
        />

        <input
          className="border rounded-lg p-3"
          placeholder="Stock Quantity"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button
          onClick={saveProduct}
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-3 font-bold"
        >
          Save Product
        </button>

      </div>

      <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            Products List
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Code</th>

              <th className="p-4 text-left">Product</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Purchase</th>

              <th className="p-4 text-left">Sale</th>

              <th className="p-4 text-left">Stock</th>

              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {products.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">
                  {item.productCode}
                </td>

                <td className="p-4 font-medium">
                  {item.productName}
                </td>

                <td className="p-4">
                  {item.category}
                </td>

                <td className="p-4">
                  Rs. {item.purchasePrice}
                </td>
                                <td className="p-4">
                  Rs. {item.salePrice}
                </td>

                <td className="p-4">
                  {item.stock}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => deleteProduct(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

            {products.length === 0 && (

              <tr>

                <td
                  colSpan="7"
                  className="text-center p-8 text-gray-500"
                >
                  No Products Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </main>

  );

}