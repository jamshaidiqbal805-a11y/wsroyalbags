"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";


export default function TrackOrder(){

  const [orderId,setOrderId] = useState("");
  const [order,setOrder] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");


  async function trackOrder(){

    if(!orderId.trim()){
      setError("Please enter your Order ID");
      return;
    }


    try{

      setLoading(true);
      setOrder(null);
      setError("");


      const q = query(
        collection(db,"orders"),
        where(
          "orderId",
          "==",
          orderId.trim()
        )
      );


      const snapshot = await getDocs(q);


      if(!snapshot.empty){

        setOrder({

          id:snapshot.docs[0].id,
          ...snapshot.docs[0].data()

        });


      }
      else{

        setError(
          "Order not found. Please check your Order ID."
        );

      }


    }
    catch(error){

      console.log(error);

      setError(
        "Something went wrong. Please try again."
      );

    }
    finally{

      setLoading(false);

    }

  }



  const steps=[
    "Pending",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];



  return (

    <main className="
    min-h-screen
    bg-gradient-to-br
    from-[#faf8f5]
    to-yellow-50
    p-6
    ">


      <div className="
      max-w-xl
      mx-auto
      bg-white
      rounded-3xl
      shadow-2xl
      p-8
      mt-10
      ">



        <h1 className="
        text-3xl
        font-black
        text-center
        ">
          Track Your Order
        </h1>


        <p className="
        text-center
        text-gray-500
        mt-2
        ">
          Enter your WS Royal Order ID
        </p>




        <input

        value={orderId}

        onChange={(e)=>setOrderId(e.target.value)}

        placeholder="WS-ORD-1234"

        className="
        w-full
        mt-6
        h-14
        px-5
        rounded-xl
        border
        "

        />



        <button

        onClick={trackOrder}

        disabled={loading}

        className="
        w-full
        mt-4
        h-14
        rounded-xl
        font-bold
        bg-gradient-to-r
        from-[#c9a227]
        to-[#f5d76e]
        text-black
        "

        >

        {
          loading
          ?
          "Searching..."
          :
          "Track Order"
        }


        </button>





        {
          error && (

          <div className="
          mt-5
          bg-red-50
          text-red-600
          p-4
          rounded-xl
          text-center
          font-semibold
          ">

            {error}

          </div>

          )
        }







        {
        order && (


        <div className="mt-8">


        <div className="
        bg-gradient-to-br
        from-slate-900
        to-blue-900
        text-white
        rounded-3xl
        p-6
        ">



        {
          order.productImage && (

          <img

          src={order.productImage}

          alt={order.productName}

          className="
          w-44
          h-44
          mx-auto
          object-contain
          bg-white
          rounded-2xl
          p-3
          mb-5
          "

          />

          )
        }




        <h2 className="
        text-2xl
        font-black
        text-center
        ">

        {order.productName}

        </h2>



        <p className="mt-3">
          Order ID:
          <span className="font-bold ml-2">
          {order.orderId}
          </span>
        </p>



        <p className="mt-2">
          Tracking Number:
          <span className="font-bold ml-2">
          {order.trackingNumber}
          </span>
        </p>




        <p className="
        mt-2
        text-yellow-300
        font-bold
        ">

        Status:
        <span className="ml-2">
        {order.status}
        </span>

        </p>




        <p className="mt-2">

        Payment:
        <span className="
        ml-2
        font-bold
        text-green-400
        ">

        {order.paymentStatus || "Pending"}

        </span>

        </p>




        <p className="mt-2">

        Method:
        <span className="font-bold ml-2">

        {order.paymentMethod || "Cash on Delivery"}

        </span>

        </p>





        <div className="mt-8 space-y-5">


        {
          steps.map((step,index)=>{


          const current =
          steps.indexOf(order.status);



          return (

          <div
          key={step}
          className="flex items-center gap-4"
          >


          <div

          className={`
          w-12
          h-12
          rounded-full
          flex
          items-center
          justify-center
          font-bold

          ${
            index <= current
            ?
            "bg-green-500"
            :
            "bg-white/20"
          }

          `}

          >

          {
            index <= current
            ?
            "✓"
            :
            ""
          }

          </div>



          <p className="font-bold">

          {step}

          </p>



          </div>

          )


          })
        }


        </div>


        </div>





        <div className="
        mt-5
        grid
        grid-cols-2
        gap-4
        ">


        <div className="bg-slate-100 rounded-2xl p-4">

        <p className="text-gray-500 text-sm">
        Customer
        </p>

        <p className="font-bold">
        {order.customerName}
        </p>

        </div>




        <div className="bg-slate-100 rounded-2xl p-4">

        <p className="text-gray-500 text-sm">
        Amount
        </p>

        <p className="font-bold">
        Rs {Number(order.amount || 0).toLocaleString()}
        </p>

        </div>




        <div className="bg-slate-100 rounded-2xl p-4">

        <p className="text-gray-500 text-sm">
        Quantity
        </p>

        <p className="font-bold">
        {order.quantity}
        </p>

        </div>




        <div className="bg-slate-100 rounded-2xl p-4">

        <p className="text-gray-500 text-sm">
        Delivery
        </p>

        <p className="font-bold">
        3-5 Days
        </p>

        </div>


        </div>




        <button

        onClick={()=>{

          setOrder(null);
          setOrderId("");

        }}

        className="
        mt-6
        w-full
        h-12
        rounded-xl
        bg-slate-900
        text-white
        font-bold
        "

        >

        Track Another Order

        </button>



        </div>


        )
        }



      </div>


    </main>

  );

}