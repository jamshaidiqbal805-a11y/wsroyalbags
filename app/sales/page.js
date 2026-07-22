"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

export default function SalesPage() {

  const [products, setProducts] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [amount, setAmount] = useState(0);
  const [profit, setProfit] = useState(0);


  async function loadProducts(){

    const snapshot = await getDocs(
      collection(db,"products")
    );

    const list=[];

    snapshot.forEach((item)=>{

      list.push({
        id:item.id,
        ...item.data()
      });

    });

    setProducts(list);

  }


  useEffect(()=>{

    loadProducts();

  },[]);



  function calculateAmount(qty, product){

    if(product){

      const total =
      Number(product.salePrice) *
      Number(qty);


      const profitAmount =
      (Number(product.salePrice) -
      Number(product.purchasePrice))
      *
      Number(qty);


      setAmount(total);
      setProfit(profitAmount);

    }

  }




  async function saveSale(){


    if(
      customerName === "" ||
      productId === "" ||
      quantity === ""
    ){

      alert("Please fill all fields");
      return;

    }


    const product =
    products.find(
      (item)=>item.id === productId
    );



    if(!product){

      alert("Product not found");
      return;

    }



    if(
      Number(quantity) >
      Number(product.stock)
    ){

      alert("Not enough stock");
      return;

    }



    const newStock =
    Number(product.stock) -
    Number(quantity);



    await updateDoc(

      doc(
        db,
        "products",
        productId
      ),

      {
        stock:newStock
      }

    );



    await addDoc(

      collection(db,"sales"),

      {

        customerName,

        product:
        product.productCode,

        productName:
        product.productName,

        quantity:
        Number(quantity),

        amount:
        Number(amount),

        profit:
        Number(profit),

        createdAt:
        serverTimestamp()

      }

    );



    alert("Sale Saved Successfully ✅");



    setCustomerName("");
    setProductId("");
    setQuantity("");
    setAmount(0);
    setProfit(0);


    loadProducts();


  }




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

onChange={(e)=>
setCustomerName(e.target.value)
}

className="w-full border p-3 rounded mb-4"

/>




<select

value={productId}

onChange={(e)=>{

const id=e.target.value;

setProductId(id);


const product =
products.find(
(item)=>item.id===id
);


if(product && quantity){

calculateAmount(
quantity,
product
);

}


}}

className="w-full border p-3 rounded mb-4"

>


<option value="">
Select Product
</option>



{
products.map((item)=>(

<option

key={item.id}

value={item.id}

>

{item.productCode}
-
{item.productName}

(Stock:{item.stock})

</option>

))
}


</select>




<input

type="number"

placeholder="Quantity"

value={quantity}

onChange={(e)=>{


const qty=e.target.value;

setQuantity(qty);



const product =
products.find(
(item)=>item.id===productId
);


calculateAmount(
qty,
product
);


}}

className="w-full border p-3 rounded mb-4"

/>




<input

type="number"

value={amount}

readOnly

className="w-full border p-3 rounded mb-4 bg-gray-100"

/>



<div className="mb-5 font-bold">

Profit: Rs {profit}

</div>




<button

onClick={saveSale}

className="w-full bg-green-600 text-white p-3 rounded"

>

Save Sale

</button>



</div>


</main>

);

}