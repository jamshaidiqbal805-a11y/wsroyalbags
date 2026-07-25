"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function handleLogin(e){

    e.preventDefault();


    // Admin Login
    if(
      email === "admin@wsroyalbags.com" &&
      password === "123456"
    ){

      localStorage.setItem(
        "adminLogin",
        "true"
      );


      router.push("/dashboard");


    }else{

      alert("Invalid Admin Login");

    }

  }



  return (

    <main className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      p-6
    ">


      <div className="
        bg-white
        w-full
        max-w-md
        rounded-2xl
        shadow-xl
        p-8
      ">


        <h1 className="
          text-3xl
          font-bold
          text-center
          text-gray-800
        ">
          🔒 WS Royal Bags
        </h1>


        <p className="
          text-center
          text-gray-500
          mt-2
          mb-8
        ">
          Admin Login
        </p>



        <form onSubmit={handleLogin}>


          <input

            type="email"

            placeholder="Admin Email"

            value={email}

            onChange={(e)=>
              setEmail(e.target.value)
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

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e)=>
              setPassword(e.target.value)
            }

            className="
              w-full
              border
              p-3
              rounded-lg
              mb-6
            "

          />



          <button

            type="submit"

            className="
              w-full
              bg-black
              text-white
              p-3
              rounded-lg
              font-bold
              hover:bg-gray-800
            "

          >

            Login

          </button>


        </form>


        <p className="
          text-xs
          text-gray-400
          text-center
          mt-5
        ">
          WS Royal Bags Business Dashboard
        </p>


      </div>


    </main>

  );

}