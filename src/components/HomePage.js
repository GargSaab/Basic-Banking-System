import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/")
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        setData(results);
      });
  }, []);

  return (
    <div>
      {/* <Link to={{
            pathname:"/about",
            data:{
                Name:"Keshav Garg",
                Edu:"NITH"
            }
            }}>Banking System</Link> */}

      <div className="header">
        <span className="span1">Customer Details</span>
      </div>
      <div className="boxh">
        <div className="boxh1">Customer Name</div>
        <div className="boxh1">Email id</div>
        <div className="boxh1">Current Balance</div>
      </div>
      {data.map((item) => {
        return (
          <div className="box">
            <div className="box1">{item.name}</div>
            <div className="box1">{item.email}</div>
            <div className="box1">{item.Current_Bal} rs</div>
          </div>
        );
      })}
      <div className="box2">
        <button className="btn">
          <Link
            to={{
              pathname: "/transfer",
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            Transfer Money
          </Link>
        </button>
        <button className="btn">
          <Link
            to="/newcustomer"
            style={{ textDecoration: "none", color: "black" }}
          >
            Add New Customer
          </Link>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
