"use client";

import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

import Image from "next/image";


export default function ProductsPage() {


  // =========================
  // FORM STATES
  // =========================

  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [category, setCategory] = useState("");

  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const [stock, setStock] = useState("");

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [uploading, setUploading] = useState(false);


  // =========================
  // PRODUCTS
  // =========================

  const [products, setProducts] = useState([]);

  const [editId, setEditId] = useState(null);


  const [search, setSearch] = useState("");

  const [filterCategory, setFilterCategory] = useState("All");


  // =========================
  // LOAD PRODUCTS
  // =========================


  async function loadProducts(){

    try{

      const snapshot = await getDocs(
        collection(db,"products")
      );


      const list = snapshot.docs.map((docItem)=>({

        id:docItem.id,

        ...docItem.data()

      }));


      setProducts(list);


    }catch(error){

      console.log(error);

    }

  }



  useEffect(()=>{

    loadProducts();

  },[]);





  // =========================
  // AUTO PRODUCT CODE
  // =========================


  function generateCode(){

    const number =
      products.length + 1;


    const code =
      `WS-${String(number).padStart(3,"0")}`;


    setProductCode(code);

  }






  // =========================
  // IMAGE SELECT
  // =========================


  function handleImage(e){

    const file =
      e.target.files[0];


    if(!file) return;


    if(file.size > 5 * 1024 * 1024){

      alert("Image size must be less than 5MB");

      return;

    }


    setImage(file);


  }






  // =========================
  // CLOUDINARY UPLOAD
  // =========================


  async function uploadImage(){


    if(!image){

      alert("Please select image first");

      return;

    }


    setUploading(true);



    const formData = new FormData();


    formData.append(
      "file",
      image
    );


    formData.append(
      "upload_preset",
      "wsroyalbags"
    );



    try{


      const response =
      await fetch(
        "https://api.cloudinary.com/v1_1/oxbn6dbh/image/upload",
        {

          method:"POST",

          body:formData

        }
      );



      const data =
      await response.json();



      setImageUrl(
        data.secure_url
      );


      alert(
        "Image Uploaded Successfully"
      );



    }catch(error){


      console.log(error);

      alert(
        "Upload Failed"
      );


    }



    setUploading(false);


  }

  
// =========================
// SAVE PRODUCT
// =========================


async function saveProduct(){


  if(
    !productName ||
    !productCode ||
    !category ||
    !purchasePrice ||
    !salePrice ||
    !stock
  ){

    alert(
      "Please fill all required fields"
    );

    return;

  }



  try{


    await addDoc(
      collection(db,"products"),
      {

        productName,

        productCode,

        category,

        purchasePrice:
        Number(purchasePrice),

        salePrice:
        Number(salePrice),

        stock:
        Number(stock),

        imageUrl:
        imageUrl || "",


        createdAt:
        serverTimestamp()

      }
    );



    alert(
      "Product Added Successfully"
    );



    clearForm();


    loadProducts();



  }catch(error){


    console.log(error);

    alert(
      error.message
    );


  }


}





// =========================
// CLEAR FORM
// =========================


function clearForm(){


  setProductName("");

  setProductCode("");

  setCategory("");

  setPurchasePrice("");

  setSalePrice("");

  setStock("");

  setImage(null);

  setImageUrl("");

  setEditId(null);


}





// =========================
// EDIT PRODUCT
// =========================


function editProduct(item){


  setEditId(item.id);


  setProductName(
    item.productName || ""
  );


  setProductCode(
    item.productCode || ""
  );


  setCategory(
    item.category || ""
  );


  setPurchasePrice(
    item.purchasePrice || ""
  );


  setSalePrice(
    item.salePrice || ""
  );


  setStock(
    item.stock || ""
  );


  setImageUrl(
    item.imageUrl || ""
  );


  setImage(null);


}





// =========================
// UPDATE PRODUCT
// =========================


async function updateProduct(){


  if(!editId){

    return;

  }



  try{


    await updateDoc(
      doc(db,"products",editId),
      {


        productName,

        productCode,

        category,


        purchasePrice:
        Number(purchasePrice),


        salePrice:
        Number(salePrice),


        stock:
        Number(stock),


        imageUrl:
        imageUrl || ""

      }
    );



    alert(
      "Product Updated Successfully"
    );



    clearForm();


    loadProducts();



  }catch(error){


    console.log(error);


  }


}





// =========================
// DELETE PRODUCT
// =========================


async function deleteProduct(id){


  const confirmDelete =
  confirm(
    "Are you sure you want to delete this product?"
  );


  if(!confirmDelete)
    return;



  try{


    await deleteDoc(
      doc(db,"products",id)
    );



    alert(
      "Product Deleted"
    );


    loadProducts();



  }catch(error){


    console.log(error);


  }


}





// =========================
// SEARCH + FILTER
// =========================


const filteredProducts =
products.filter((item)=>{


  const name =
  (
    item.productName || ""
  )
  .toLowerCase();



  const code =
  (
    item.productCode || ""
  )
  .toLowerCase();



  const searchMatch =
  name.includes(
    search.toLowerCase()
  )
  ||
  code.includes(
    search.toLowerCase()
  );



  const categoryMatch =
  filterCategory === "All"
  ||
  item.category === filterCategory;



  return (
    searchMatch &&
    categoryMatch
  );


});
// =========================
// UI START
// =========================

return (

<main className="min-h-screen bg-gray-100 p-6">


{/* HEADER */}

<div className="bg-white rounded-2xl shadow p-6 mb-6">


<h1 className="text-3xl font-bold text-gray-800">

Products Management

</h1>


<p className="text-gray-500 mt-2">

Manage luxury bags inventory, prices and stock

</p>


</div>





{/* SEARCH FILTER */}


<div className="bg-white rounded-2xl shadow p-6 mb-6">


<h2 className="text-xl font-bold mb-4">

Search Products

</h2>



<div className="grid md:grid-cols-2 gap-4">


<input

type="text"

placeholder="Search by name or code..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border rounded-xl p-3 w-full"

/>



<select

value={filterCategory}

onChange={(e)=>setFilterCategory(e.target.value)}

className="border rounded-xl p-3 w-full"

>


<option value="All">

All Categories

</option>


<option value="Handbag">

Handbags

</option>


<option value="Shoulder">

Shoulder Bags

</option>


<option value="Office">

Office Bags

</option>


<option value="Travel">

Travel Bags

</option>


</select>


</div>


</div>







{/* PRODUCT FORM */}



<div className="bg-white rounded-2xl shadow p-6">


<h2 className="text-2xl font-bold mb-5">

{editId ? "Update Product" : "Add New Product"}

</h2>



<div className="grid md:grid-cols-2 gap-4">





<input

className="border rounded-xl p-3"

placeholder="Product Name"

value={productName}

onChange={(e)=>setProductName(e.target.value)}

/>






<div className="flex gap-2">


<input

className="border rounded-xl p-3 flex-1"

placeholder="Product Code"

value={productCode}

onChange={(e)=>setProductCode(e.target.value)}

/>


<button

onClick={generateCode}

className="bg-black text-white px-4 rounded-xl"

>

Generate

</button>


</div>







<select

className="border rounded-xl p-3"

value={category}

onChange={(e)=>setCategory(e.target.value)}

>


<option value="">

Select Category

</option>


<option value="Handbag">

Handbag

</option>


<option value="Shoulder">

Shoulder

</option>


<option value="Office">

Office

</option>


<option value="Travel">

Travel

</option>


</select>






<input

type="number"

className="border rounded-xl p-3"

placeholder="Purchase Price"

value={purchasePrice}

onChange={(e)=>setPurchasePrice(e.target.value)}

/>






<input

type="number"

className="border rounded-xl p-3"

placeholder="Sale Price"

value={salePrice}

onChange={(e)=>setSalePrice(e.target.value)}

/>






<input

type="number"

className="border rounded-xl p-3"

placeholder="Stock Quantity"

value={stock}

onChange={(e)=>setStock(e.target.value)}

/>







<input

type="file"

accept="image/*"

onChange={handleImage}

className="border rounded-xl p-3"

/>



</div>





{/* IMAGE PREVIEW */}



{image && (


<div className="mt-5">


<p className="font-semibold mb-2">

Selected Image Preview

</p>



<Image

src={URL.createObjectURL(image)}

alt="preview"

width={150}

height={150}

className="rounded-xl object-cover"

/>


</div>


)}




{imageUrl && (


<div className="mt-5">


<p className="font-semibold mb-2">

Uploaded Image

</p>



<Image

src={imageUrl}

alt="uploaded"

width={150}

height={150}

className="rounded-xl object-cover"

/>


</div>


)}






<div className="flex gap-3 mt-6">



<button

onClick={uploadImage}

className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold"

>

{uploading ? "Uploading..." : "Upload Image"}

</button>





<button

onClick={
editId
?
updateProduct
:
saveProduct
}

className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold"

>


{
editId
?
"Update Product"
:
"Save Product"
}


</button>





{
editId && (

<button

onClick={clearForm}

className="bg-gray-500 text-white px-6 py-3 rounded-xl font-bold"

>

Cancel

</button>

)

}



</div>


</div>
// =========================
// PRODUCTS TABLE
// =========================


<div className="bg-white rounded-2xl shadow mt-8 overflow-hidden">


<div className="p-6 border-b">


<h2 className="text-2xl font-bold">

Products List

</h2>


<p className="text-gray-500">

Total Products: {filteredProducts.length}

</p>


</div>





<div className="overflow-x-auto">


<table className="w-full">


<thead className="bg-gray-100">


<tr>


<th className="p-4 text-left">
Image
</th>


<th className="p-4 text-left">
Code
</th>


<th className="p-4 text-left">
Product
</th>


<th className="p-4 text-left">
Category
</th>


<th className="p-4 text-left">
Purchase
</th>


<th className="p-4 text-left">
Sale
</th>


<th className="p-4 text-left">
Stock
</th>


<th className="p-4 text-center">
Action
</th>


</tr>


</thead>





<tbody>



{
filteredProducts.map((item)=>(


<tr

key={item.id}

className="border-t hover:bg-gray-50 transition"

>




<td className="p-4">


{

item.imageUrl ? (


<Image

src={item.imageUrl}

alt={item.productName}

width={70}

height={70}

className="rounded-xl object-cover"

/>


)


:


(


<div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center text-xs">

No Image

</div>


)


}


</td>







<td className="p-4 font-semibold">

{item.productCode}

</td>







<td className="p-4">


<div className="font-bold">

{item.productName}

</div>


</td>







<td className="p-4">


<span className="bg-gray-100 px-3 py-1 rounded-full text-sm">


{item.category}


</span>


</td>







<td className="p-4">


Rs. {Number(item.purchasePrice || 0).toLocaleString()}


</td>







<td className="p-4 font-bold text-green-700">


Rs. {Number(item.salePrice || 0).toLocaleString()}


</td>







<td className="p-4">


{


item.stock <= 0 ? (


<span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">


Out Of Stock


</span>


)


:


item.stock <= 5 ? (


<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">


Low Stock ({item.stock})


</span>


)


:


(


<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">


{item.stock} Available


</span>


)


}



</td>








<td className="p-4">


<div className="flex gap-2 justify-center">





<button


onClick={()=>editProduct(item)}


className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"


>


Edit


</button>






<button


onClick={()=>deleteProduct(item.id)}


className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"


>


Delete


</button>





</div>


</td>






</tr>


))


}





{
filteredProducts.length === 0 && (


<tr>


<td

colSpan="8"

className="text-center p-10 text-gray-500"

>


No Products Found


</td>


</tr>


)


}




</tbody>



</table>


</div>


</div>


// =========================
// END CONTAINER
// =========================


</main>


);


}