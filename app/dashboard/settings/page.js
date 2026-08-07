"use client";

import {
useState,
useEffect
} from "react";

import {
doc,
getDoc,
setDoc
} from "firebase/firestore";

import {
db
} from "@/lib/firebase";


export default function SettingsPage(){


const [businessName,setBusinessName] =
useState("WS Royal Bags");


const [phone,setPhone] =
useState("+92 315 7405911");


const [email,setEmail] =
useState("info@wsroyalbags.com");



useEffect(()=>{

loadSettings();

},[]);



async function loadSettings(){

const snap = await getDoc(
doc(db,"settings","business")
);


if(snap.exists()){

const data = snap.data();

setBusinessName(
data.businessName || ""
);

setPhone(
data.phone || ""
);

setEmail(
data.email || ""
);

}

}



async function saveSettings(){

await setDoc(

doc(db,"settings","business"),

{
businessName,
phone,
email
}

);


alert(
"Settings Saved"
);

}




return (

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">
⚙️ Settings
</h1>


<div className="bg-white rounded-3xl shadow p-6 max-w-xl">


<h2 className="text-xl font-bold mb-4">
Business Information
</h2>


<input
value={businessName}
onChange={(e)=>setBusinessName(e.target.value)}
className="w-full border rounded-xl p-3 mb-3"
placeholder="Business Name"
/>



<input
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className="w-full border rounded-xl p-3 mb-3"
placeholder="Phone"
/>



<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border rounded-xl p-3"
placeholder="Email"
/>



<button

onClick={saveSettings}

className="mt-5 bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold"

>

Save Settings

</button>


</div>


</div>

);


}