"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/userActions";
import { useSearchParams } from "next/navigation"
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";


const PaymentPage = ({ username }) => {
  // const {data:session} = useSession(); 
  const [paymentform, setPaymentform] = useState({name:"",message:"",amount:""});
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams() 
  const router = useRouter() 

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if(searchParams.get("paymentdone")=="true"){
      toast("Wohooo! A payment rcvd!",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover:true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
    router.push(`/${username}`)
  }, [])
   

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u);
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };

  const pay = async (amount) => {
    //get orderId
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "GET ME A CHAI", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer"s contact information especially their phone number
        name: "Gaurav Kumar", //your customer"s name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer"s phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();

  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
        {/* Same as */}
      <ToastContainer/>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="cover w-full relative">
        <Image
          className="object-cover w-full h-50 md:h-[350]"
          src={currentUser.coverpic}
          width={128}
          height={128}
          alt=""
        />
        <div className="absolute -bottom-16 right-[38%] md:right-[44%] overflow-hidden rounded-full size-35">
          <Image
            className="border-gray-400 border-4 rounded-full object-cover size 36"
            height="128"
            width="128"
            src={currentUser.profilepic}
            alt="image_of_user"
          />
        </div>
      </div>
      <div className=" info flex justify-center items-center my-20 gap-4 flex-col">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">Let"s help {username} to get a ☕</div>
        <div className="text-slate-400">
          {payments.length} Payments • {currentUser.name} ₹ {payments.reduce((a, b) => a + b.amount, 0)} raised
        </div>
        <div className="payment flex gap-3 w-[80%] mt-11">
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-10">
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
            {Array.isArray(payments) ? (
              <ul className="mx-5">
                {payments.map((p, i) => (
                  <li key={i} className="my-2 flex gap-2 items-center">
                    <Image width={33} height={33} src="/avatar.gif"  alt="user avatar" />
                    <span>
                      {p.name} donated <b>₹{p.amount}</b> with message "
                      {p.message}"
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payment data available.</p>
            )}
          </div>
          <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg p-10">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <input
                onChange={handleChange}
                value={paymentform.name}
                name="name"
                type="text"
                className="text-black w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Name"
              />
              <input
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                type="text"
                className="text-black w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
              />
              <input
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                type="text"
                className="text-black w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
              />
              <button
                onClick={()=>pay(Number.parseInt(paymentform.amount)*100)}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100" disabled={isNaN(paymentform.amount) || Number(paymentform.amount) <= 0}

              >
                Pay
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-5">
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(1000)}
              >
                Pay ₹10
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(2000)}
              >
                Pay ₹20
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(3000)}
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
