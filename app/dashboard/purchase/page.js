"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function PurchasePage() {

  const [products, setProducts] = useState([]);

  const [productId, setProductId] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  async function loadProducts() {

    const snapshot = await getDocs(collection(db, "products"));

    const list = [];

    snapshot.forEach((item) => {

      list.push({
        id: item.id,
        ...item.data(),
      });

    });

    setProducts(list);

  }

  useEffect(() => {

    loadProducts();

  }, []);

  async function savePurchase() {

    if (
      productId === "" ||
      supplier === "" ||
      quantity === "" ||
      price === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const selectedProduct = products.find(
      (item) => item.id === productId
    );

    if (!selectedProduct) {
      alert("Product not found");
      return;
    }

    const newStock =
      Number(selectedProduct.stock) +
      Number(quantity);

    await updateDoc(
      doc(db, "products", productId),
      {
        stock: newStock,
      }
    );

    await addDoc(
      collection(db, "purchase"),
      {
        productId,
        productName: selectedProduct.productName,
        supplier,
        quantity: Number(quantity),
        price: Number(price),
        total:
          Number(quantity) *
          Number(price),
        createdAt: serverTimestamp(),
      }
    );

    alert("Purchase Saved Successfully");

    setProductId("");
    setSupplier("");
    setQuantity("");
    setPrice("");

    loadProducts();
  }

  return (

    <main className="min-h-screen bg-gray-100 p-8">

      <div className="bg-white rounded-xl shadow p-6">

        <h1 className="text-4xl font-bold">
          Purchase Management
        </h1>

        <p className="text-gray-500 mt-2">
          Add New Purchase
        </p>

      </div>
            <div className="bg-white rounded-xl shadow p-6 mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">

        <select
          className="border rounded-lg p-3"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Select Product</option>

          {products.map((item) => (
            <option key={item.id} value={item.id}>
              {item.productCode} - {item.productName}
            </option>
          ))}

        </select>

        <input
          className="border rounded-lg p-3"
          placeholder="Supplier Name"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        />

        <input
          className="border rounded-lg p-3"
          type="number"
          placeholder="Purchase Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          className="border rounded-lg p-3"
          type="number"
          placeholder="Purchase Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          onClick={savePurchase}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 font-bold"
        >
          Save Purchase
        </button>

      </div>

      <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">
            Available Products
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Current Stock</th>

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

                <td className="p-4">
                  {item.productName}
                </td>

                <td className="p-4 font-bold text-green-600">
                  {item.stock}
                </td>

              </tr>

            ))}
                        {products.length === 0 && (

              <tr>

                <td
                  colSpan="3"
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