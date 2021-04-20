import React, { useState, useEffect } from "react";

function NewCustomer(props) {
  // const {Name,Edu} = props.location.data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/")
      .then((res) => res.json())
      .then((results) => {
        setData(results);
      });
  }, []);
  const Names = [];
  data.map((item) => {
    Names.push(item.name);
  });
  console.log(Names);

  const submitData = () => {
    if (name === "") {
      alert("Enter Name");
    } else if (email === "") {
      alert("Enter Email Id");
    } else if (balance === "") {
      alert("Deposit Some Balance");
    } else if (Names.indexOf(name) != -1) {
      alert("User name exists");
    } else {
      fetch("http://127.0.0.1:3000/send", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          Current_Bal: balance,
        }),
      })
        .then((res) => res.json)
        .then((data) => {
          alert("Successfully registered");
          window.location = "/";
        })
        .catch((err) => {
          alert("Something went wrong");
        });
    }
  };
  return (
    <div className="boxtransfer">
      <div className="header">
        <span className="span1">New Customer Details</span>
      </div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Customer Name"
          className="input1"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="Customer Email Id"
          className="input1"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="number"
          placeholder="Deposit Balance"
          className="input1"
          value={balance}
          onChange={(event) => setBalance(event.target.value)}
        />
      </form>
      <div className="box2">
        <button className="btn" onClick={submitData}>
          Submit Details
        </button>
      </div>
    </div>
  );
}

export default NewCustomer;
