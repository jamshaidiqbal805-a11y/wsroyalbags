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


  const [products,setProducts] = useState([]);


  // Customer Details

  const [customerName,setCustomerName] = useState("");

  const [phone,setPhone] = useState("");

  const [address,setAddress] = useState("");



  // Product Details

  const [productId,setProductId] = useState("");

  const [quantity,setQuantity] = useState("");



  // Sale Details

  const [amount,setAmount] = useState(0);

  const [profit,setProfit] = useState(0);

  const [paymentMethod,setPaymentMethod] = useState("Cash");




  // LOAD PRODUCTS

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




  // CALCULATE SALE AMOUNT


  function calculateAmount(qty,product){


    if(product){


      const salePrice =
      Number(
        product.salePrice ||
        product.price ||
        0
      );



      const purchasePrice =
      Number(
        product.purchasePrice ||
        0
      );



      const total =
      salePrice *
      Number(qty);



      const profitAmount =

      (
        salePrice -
        purchasePrice
      )
      *
      Number(qty);




      setAmount(total);


      setProfit(profitAmount);



    }


  }
  // SAVE SALE

async function saveSale(){


  if(
    customerName === "" ||
    phone === "" ||
    productId === "" ||
    quantity === ""
  ){

    alert("Please fill all required fields");
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



  const currentStock =
  Number(
    product.stock ||
    0
  );



  if(
    Number(quantity) > currentStock
  ){

    alert("Not enough stock available");
    return;

  }




  const salePrice =

  Number(
    product.salePrice ||
    product.price ||
    0
  );




  const totalAmount =

  salePrice *
  Number(quantity);





  const newStock =

  currentStock -
  Number(quantity);





  // UPDATE PRODUCT STOCK

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






  // SAVE SALE DATA

  await addDoc(

    collection(db,"sales"),

    {


      customerName,

      phone,

      address,



      productName:

      product.productName ||
      product.name ||
      "Unknown",



      category:

      product.category ||
      "Bags",




      productCode:

      product.productCode ||
      "",





      items:[

        {

          name:

          product.productName ||
          product.name ||
          "Unknown",


          quantity:

          Number(quantity),


          price:

          salePrice

        }

      ],




      quantity:

      Number(quantity),




      amount:

      totalAmount,




      total:

      totalAmount,




      paymentMethod,




      profit:

      profit,




      createdAt:

      serverTimestamp()



    }

  );




  alert(
    "Sale Saved Successfully ✅"
  );



  setCustomerName("");

  setPhone("");

  setAddress("");

  setProductId("");

  setQuantity("");

  setAmount(0);

  setProfit(0);

  setPaymentMethod("Cash");



  loadProducts();



}
return (

<main className="
min-h-screen
bg-gray-100
p-8
">


<div className="
max-w-xl
mx-auto
bg-white
rounded-2xl
shadow-lg
p-8
">


<h1 className="
text-3xl
font-bold
mb-8
text-center
">

WS Royal Bags
Add New Sale

</h1>




<input

type="text"

placeholder="Customer Name"

value={customerName}

onChange={(e)=>
setCustomerName(e.target.value)
}

className="
w-full
border
p-3
rounded-lg
mb-4
"

/>





<input

type="text"

placeholder="Phone Number"

value={phone}

onChange={(e)=>
setPhone(e.target.value)
}

className="
w-full
border
p-3
rounded-lg
mb-4
"

/>





<input

type="text"

placeholder="Customer Address"

value={address}

onChange={(e)=>
setAddress(e.target.value)
}

className="
w-full
border
p-3
rounded-lg
mb-4
"

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

className="
w-full
border
p-3
rounded-lg
mb-4
"

>


<option value="">

Select Bag Product

</option>



{

products.map((item)=>(


<option

key={item.id}

value={item.id}

>

{

item.productCode ||
""

}

-

{

item.productName ||
item.name ||
"Bag"

}

(Stock:

{

item.stock || 0

}

)

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

className="
w-full
border
p-3
rounded-lg
mb-4
"

/>






<input

type="number"

value={amount}

readOnly

className="
w-full
border
p-3
rounded-lg
mb-4
bg-gray-100
"

/>





<select

value={paymentMethod}

onChange={(e)=>
setPaymentMethod(e.target.value)
}

className="
w-full
border
p-3
rounded-lg
mb-4
"

>


<option>
Cash
</option>


<option>
Online
</option>


<option>
Bank Transfer
</option>


</select>





<div className="
mb-5
font-bold
text-green-600
">

Profit:
Rs {profit}

</div>





<button

onClick={saveSale}

className="
w-full
bg-green-600
text-white
p-3
rounded-lg
font-bold
hover:bg-green-700
"

>

Save Sale

</button>




</div>


</main>


);


}