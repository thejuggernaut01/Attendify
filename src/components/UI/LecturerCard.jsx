import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../../store/AuthContext";
import { db } from "../../firebase";

const LectuerCard = (props) => {
  return (
    <>
      <section className="mt-10">
        <div className="text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto">
          <div className="inline-block text-white p-14 rounded-[50%] bg-blue-500 relative">
            <h2
              className="absolute text-6xl top-[50%] left-[50%]"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              L
            </h2>
          </div>
          <p className="text-lg font-semibold">
            Dummy
          </p>
          <p className="text-sm italic">
            Dummy
          </p>
        </div>
      </section>
    </>
  );
};

export default LectuerCard;
