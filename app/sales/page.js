"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function SalesPage() {
  const [customerName, setCustomerName] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");

  const saveSale = async () => {
    if (!customerName || !product || !quantity || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "sales"), {
        customerName,
        product,
        quantity: Number(quantity),
        amount: Number(amount),
        createdAt: serverTimestamp(),
      });

      alert("Sale Saved Successfully ✅");

      setCustomerName("");
      setProduct("");
      setQuantity("");
      setAmount("");
    } catch (error) {
      console.error(error);
      alert("Error saving sale");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Add New Sale
      </h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Product Code (WS-001)"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded mb-6"
        />

        <button
          onClick={saveSale}
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
        >
          Save Sale
        </button>

      </div>
    </main>
  );
}