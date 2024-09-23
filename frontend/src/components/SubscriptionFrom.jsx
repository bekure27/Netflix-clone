
import { useState } from "react";
import axios from "../utils/axiosConfig";
import { useLocation } from "react-router-dom";
import { UserAuth } from "../context/context";

function SubscriptionForm() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { subUser, isSubscribed } = UserAuth();
  const [email1, setEmail1] = useState("");
 const location = useLocation();
 const email = location.state?.email || null;
  const handleSubscription = async () => {
    try {
      const response = await axios.post("/api/create-subscription", {
        plan: selectedPlan,
        email: email || email1,
      });

      const paymentLink = response.data.paymentLink;
       console.log(paymentLink)
      if (paymentLink) {
      const subscriptionData = {
        email: email || email1,
        plan: selectedPlan,
        subscriptionStatus: "subscribed",
      };

      subUser(subscriptionData);
        window.location.href = paymentLink;
      } else {
        console.error("Invalid plan selection");
      }
    } catch (error) {
      console.log(error)
      console.log(error.message);
    }
  };


const handleEmailChange = (e) => {
  setEmail1(e.target.value);
};


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-black text-white p-6 rounded-lg">
        <h2 className="text-2xl mb-4">Choose a Plan</h2>
        <label className="block mb-4">
          <input
            type="radio"
            name="plan"
            value="monthly"
            onChange={() => setSelectedPlan("monthly")}
          />
          Monthly Plan
        </label>
        <label className="block mb-4">
          <input
            type="radio"
            name="plan"
            value="annual"
            onChange={() => setSelectedPlan("annual")}
          />
          Annual Plan
        </label>
        <div className="mt-4 mb-6">
          <p className="text-white">Email:</p>
          {isSubscribed ? (
            <p className="text-white font-bold">{email}</p>
          ) : (
            <input
              onChange={handleEmailChange}
              className="text-black"
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email"
              autoComplete="email"
            />
          )}
        </div>
       
        <button
          onClick={handleSubscription}
          className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800 transition duration-300"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default SubscriptionForm;

