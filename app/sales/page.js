"use client";

import { useEffect, useMemo, useState } from "react";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  ShoppingBag,
  Wallet,
  TrendingUp,
  Package,
  User,
  Phone,
  MapPin,
  Search,
  Trash2,
} from "lucide-react";

export default function SalesPage() {

  // ==========================
  // STATES
  // ==========================

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [orderStatus, setOrderStatus] = useState("Pending");

  const [amount, setAmount] = useState(0);
  const [profit, setProfit] = useState(0);

  const [saleSearch, setSaleSearch] = useState("");
  const [saving, setSaving] = useState(false);

  // ==========================
  // LOAD PRODUCTS
  // ==========================

  async function loadProducts() {

    const snapshot = await getDocs(
      collection(db, "products")
    );

    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    setProducts(data);

  }

  // ==========================
  // LOAD SALES
  // ==========================

  async function loadSales() {

    const snapshot = await getDocs(
      collection(db, "sales")
    );

    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    data.sort(
      (a, b) =>
        (b.createdAt?.seconds || 0) -
        (a.createdAt?.seconds || 0)
    );

    setSales(data);

  }

  useEffect(() => {

    loadProducts();
    loadSales();

  }, []);

  // ==========================
  // SELECTED PRODUCT
  // ==========================

  const selectedProduct = useMemo(() => {

    return products.find(
      (item) => item.id === productId
    );

  }, [products, productId]);

  // ==========================
  // AUTO CALCULATE
  // ==========================

  useEffect(() => {

    if (!selectedProduct || !quantity) {

      setAmount(0);
      setProfit(0);

      return;

    }

    const salePrice = Number(
      selectedProduct.salePrice ||
      selectedProduct.price ||
      0
    );

    const purchasePrice = Number(
      selectedProduct.purchasePrice || 0
    );

    setAmount(
      salePrice * Number(quantity)
    );

    setProfit(
      (salePrice - purchasePrice) *
      Number(quantity)
    );

  }, [selectedProduct, quantity]);
    // ==========================
  // KPI
  // ==========================

  const totalRevenue = sales.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalProfit = sales.reduce(
    (sum, item) => sum + Number(item.profit || 0),
    0
  );

  const totalOrders = sales.length;

  // ==========================
  // SAVE SALE
  // ==========================

  async function saveSale() {

  if (saving) return;

  if (
    !customerName ||
    !phone ||
    !productId ||
    !quantity
  ) {
    alert("Please fill all required fields.");
    return;
  }

  if (!selectedProduct) {
  alert("Invalid Product.");
  setSaving(false);
  return;
}

    const currentStock = Number(
      selectedProduct.stock || 0
    );
    try {

    if (Number(quantity) > currentStock) {
      alert("Not enough stock available.");
      return;
    }

    await addDoc(
 collection(db, "sales"),
 {
   customerName,
   phone,
   address,

   productId: selectedProduct.id,

   productName:
    selectedProduct.productName ||
    selectedProduct.name,

   productCode:
    selectedProduct.productCode || "",

   productImage:
selectedProduct.imageUrl ||
selectedProduct.image ||
"",
   productPrice:
    Number(
      selectedProduct.salePrice ||
      selectedProduct.price ||
      0
    ),

   category:
    selectedProduct.category || "",

   quantity: Number(quantity),

   amount,

   profit,

   paymentMethod,
   orderStatus,

   createdAt: serverTimestamp(),
 }
);
// ==========================
// UPDATE PRODUCT STOCK
// ==========================

await updateDoc(
  doc(db,"products", selectedProduct.id),
  {
    stock:
      Number(selectedProduct.stock || 0) - Number(quantity)
  }
);

    setCustomerName("");
    setPhone("");
    setAddress("");
    setProductId("");
    setQuantity("");
    setPaymentMethod("Cash");
    setOrderStatus("Pending");
    setAmount(0);
    setProfit(0);

  loadProducts();
loadSales();

alert("Sale saved successfully!");

}
catch(error){

  console.error(error);
  alert("Something went wrong while saving sale");

}
finally{

  setSaving(false);

}

}
// ==========================
// UPDATE ORDER STATUS
// ==========================

async function updateOrderStatus(id, status) {

  await updateDoc(
    doc(db, "sales", id),
    {
      orderStatus: status,
    }
  );

  loadSales();

}
  // ==========================
  // DELETE SALE
  // ==========================

  async function deleteSale(id) {
    
    

    const sale = sales.find(
      (item) => item.id === id
    );

    if (!sale) return;

    if (!confirm("Delete this sale?")) return;

    const product = products.find(
      (item) => item.id === sale.productId
    );

    if (product) {

      await updateDoc(
        doc(db, "products", product.id),
        {
          stock:
            Number(product.stock || 0) +
            Number(sale.quantity || 0),
        }
      );

    }

    await deleteDoc(
      doc(db, "sales", id)
    );

    loadProducts();
    loadSales();

  }

  return (
        <main className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#fff7e6] p-4 lg:p-6">

      <div className="max-w-[1600px] mx-auto">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#2563eb] p-6 rounded-3xl shadow-xl">

          <div className="flex-1 text-center">
  
  <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
    WS Royal Bags
  </h1>

  <p className="text-lg font-semibold text-white/90 mt-2">
    Premium Sales Management Dashboard
  </p>

</div>

          <div className="mt-5 lg:mt-0">

            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-2xl shadow-xl font-bold">
  Sales Dashboard
</div>

          </div>

        </div>

        {/* KPI CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 p-6 hover:-translate-y-1">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Revenue
                </p>

                <h2 className="text-3xl font-black text-green-600 mt-2">
                  Rs {totalRevenue.toLocaleString()}
                </h2>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
                <Wallet size={30} className="text-green-600" />
              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 p-6 hover:-translate-y-1">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Orders
                </p>

                <h2 className="text-3xl font-black text-blue-600 mt-2">
                  {totalOrders}
                </h2>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                <ShoppingBag size={30} className="text-blue-600" />
              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 p-6 hover:-translate-y-1">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Profit
                </p>

                <h2 className="text-3xl font-black text-yellow-600 mt-2">
                  Rs {totalProfit.toLocaleString()}
                </h2>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">
                <TrendingUp size={30} className="text-yellow-600" />
              </div>

            </div>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-5 gap-6">
                    {/* LEFT SIDE */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5">

              <h2 className="text-xl font-black text-slate-900 mb-2">
 Add New Sale
</h2>

              <p className="text-sm text-gray-500 mb-6">
 Create a new customer sale.
</p>

              <div className="space-y-4">

                {/* Customer */}

                <div>

                 <label className="flex items-center gap-2 text-sm font-semibold mb-2">
  <User size={16} className="text-yellow-500" />
  Customer Name
</label>
<input
type="text"
value={customerName}
onChange={(e)=>setCustomerName(e.target.value)}
placeholder="Customer Name"
className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
/>

                </div>

                {/* Phone */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
  <Phone size={16} className="text-yellow-500" />
  Phone Number
</label>

                  <div className="relative">

                    

                    <input
                      type="text"
                      value={phone}
                      onChange={(e)=>setPhone(e.target.value)}
                      placeholder="03XXXXXXXXX"
                      className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />

                  </div>

                </div>

                {/* Address */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
  <MapPin size={16} className="text-yellow-500" />
  Address
</label>

                  <div className="relative">

                    

                    <input
                      type="text"
                      value={address}
                      onChange={(e)=>setAddress(e.target.value)}
                      placeholder="Customer Address"
                      className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />

                  </div>

                </div>

                {/* Product */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
  <Package size={16} className="text-yellow-500" />
  Select Product
</label>

                  <div className="relative">

                    

                    <select
                      value={productId}
                      onChange={(e)=>setProductId(e.target.value)}
                      className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >

                      <option value="">
                        Select Product
                      </option>

                      {products.map((item)=>(

                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.productCode} - {item.productName || item.name} (Stock {item.stock})
                        </option>

                      ))}

                    </select>

                  </div>

                </div>
                                {/* Quantity */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Quantity
                  </label>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e)=>setQuantity(e.target.value)}
                    placeholder="Enter Quantity"
                    className="w-full h-12 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />

                </div>

                {/* Amount + Profit */}

                <div className="grid grid-cols-2 gap-4 mt-2">

                  <div className="rounded-2xl bg-green-50 border border-green-100 p-4">

                    <p className="text-sm text-gray-500">
                      Total Amount
                    </p>

                    <h2 className="text-2xl font-black text-green-600 mt-2">
                      Rs {amount.toLocaleString()}
                    </h2>

                  </div>

                  <div className="rounded-2xl bg-yellow-50 border border-yellow-100 p-4">

                    <p className="text-sm text-gray-500">
                      Profit
                    </p>

                    <h2 className="text-2xl font-black text-yellow-600 mt-2">
                      Rs {profit.toLocaleString()}
                    </h2>

                  </div>

                </div>

                {/* Payment */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Payment Method
                  </label>
                  

                  <select
                    value={paymentMethod}
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                    className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >

                    <option>Cash</option>
                    <option>Online</option>
                    <option>Bank Transfer</option>

                  </select>

                </div>
                <div>

<label className="block text-sm font-semibold mb-2">
Order Status
</label>

<select
value={orderStatus}
onChange={(e)=>setOrderStatus(e.target.value)}
className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
>

<option>Pending</option>
<option>Confirmed</option>
<option>Shipped</option>
<option>Delivered</option>
<option>Cancelled</option>

</select>

</div>

                {/* Save Button */}

                <button
disabled={saving}
onClick={saveSale}
                  className={`w-full h-14 rounded-2xl text-white text-lg font-black shadow-xl transition-all duration-300
${
saving
? "bg-gray-400 cursor-not-allowed"
: "bg-gradient-to-r from-yellow-500 to-amber-600 hover:scale-[1.03] hover:shadow-2xl"
}
`}
                >
                  {saving ? "Saving..." : "Save Sale"}
                </button>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="lg:col-span-3">

            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 w-full">

              <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
                <ShoppingBag size={24} className="text-yellow-500"/>
                Recent Sales
              </h2>
                            {/* SEARCH */}

              <div className="relative mb-6">

                <Search
                  size={20}
                  className="absolute left-5 top-5 text-gray-400"
                />

                <input
  type="text"
  placeholder=""
  value={saleSearch}
  onChange={(e) => setSaleSearch(e.target.value)}
  className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
/>

              </div>

              <div className="space-y-4">

                {sales.length === 0 ? (

                  <div className="rounded-3xl border-2 border-dashed border-slate-300 p-16 text-center">

                    <ShoppingBag
                      size={60}
                      className="mx-auto text-gray-300 mb-4"
                    />

                    <h3 className="text-2xl font-black text-slate-700">
                      No Sales Found
                    </h3>

                    <p className="text-gray-500 mt-1 text-base">
                      Your customer sales will appear here.
                    </p>

                  </div>

                ) : (

                  sales

                    .filter((sale) => {

                      const search = saleSearch.toLowerCase();

                      return (

  sale.customerName?.toLowerCase().includes(search) ||

  sale.phone?.toLowerCase().includes(search) ||

  sale.productName?.toLowerCase().includes(search) ||

  sale.productCode?.toLowerCase().includes(search)

);

                    })

                    .map((sale) => (

                      <div
                        key={sale.id}
                        className="rounded-3xl border border-slate-200 bg-slate-50 p-6 hover:shadow-xl transition-all"
                      >

                        <div className="flex justify-between items-start">

                          <div>

                            <h3 className="text-xl font-black text-slate-900">
                              {sale.customerName}
                            </h3>

                            <p className="text-gray-500 mt-1">
                              {sale.phone}
                            </p>

                          </div>

                          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold">

                            Rs {Number(sale.amount).toLocaleString()}

                          </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">

                          <div>

                            <p className="text-gray-500 text-sm">
                              Product
                            </p>

                            <p className="font-bold">
                              {sale.productName}
                            </p>

                          </div>

                          <div>

                            <p className="text-gray-500 text-sm">
                              Product Code
                            </p>

                            <p className="font-bold">
                              {sale.productCode}
                            </p>

                          </div>

                          <div>

                            <p className="text-gray-500 text-sm">
                              Quantity
                            </p>

                            <p className="font-bold">
                              {sale.quantity}
                            </p>

                          </div>

                          <div>

                            <p className="text-gray-500 text-sm">
                              Payment
                            </p>

                            <p className="font-bold">
                              {sale.paymentMethod}
                            </p>

                          </div>
                          <div>

<p className="text-gray-500 text-sm">
Status
</p>

<p
className={`inline-block px-4 py-2 rounded-full text-sm font-bold
${
sale.orderStatus === "Delivered"
? "bg-green-100 text-green-700"
:
sale.orderStatus === "Cancelled"
? "bg-red-100 text-red-700"
:
sale.orderStatus === "Shipped"
? "bg-blue-100 text-blue-700"
:
"bg-yellow-100 text-yellow-700"
}
`}
>
{sale.orderStatus || "Pending"}

</p>
<select
value={sale.orderStatus || "Pending"}
onChange={(e)=>updateOrderStatus(sale.id, e.target.value)}
className="
mt-3
w-full
border
border-slate-200
rounded-xl
px-3
py-2
bg-white
text-sm
font-semibold
"
>

<option>Pending</option>
<option>Processing</option>
<option>Shipped</option>
<option>Delivered</option>
<option>Cancelled</option>

</select>

</div>
                                                    <div>

                            <p className="text-gray-500 text-sm">
                              Profit
                            </p>

                            <p className="font-bold text-yellow-600">
                              Rs {Number(sale.profit || 0).toLocaleString()}
                            </p>

                          </div>

                          <div>

                            <p className="text-gray-500 text-sm">
                              Date
                            </p>

                            <p className="font-bold">

  {sale.createdAt?.seconds
 ? new Date(
     sale.createdAt.seconds * 1000
   ).toLocaleString()
 : "N/A"}

                            </p>

                          </div>

                        </div>

                        <button
                          onClick={() => deleteSale(sale.id)}
                          className="mt-6 w-full h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-bold hover:opacity-90 transition"
                        >

                          <div className="flex items-center justify-center gap-2">

                            <Trash2 size={18} />

                            Delete Sale

                          </div>

                        </button>

                      </div>

                    ))

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}