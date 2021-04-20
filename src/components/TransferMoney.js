import React, { useEffect, useState } from "react";
import { AutoSuggest } from "react-autosuggestions";

function TransferMoney(props) {
  const [makefrom, setMakefrom] = useState("");
  const [maketo, setMaketo] = useState("");
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState();
  const Names = [];

  useEffect(() => {
    fetch("http://127.0.0.1:3000/")
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        setData(results);
      });
  }, []);
  data.map((item) => {
    Names.push(item.name);
  });
  console.log(Names);
  const update = () => {
    const l = data.length;
    let i = 0;
    let j = 0;
    for (i = 0; i < l; i++) {
      if (data[i].name === makefrom) {
        break;
      }
    }
    for (j = 0; j < l; j++) {
      if (data[j].name === maketo) {
        break;
      }
    }
    if (data[i].Current_Bal - balance < 0) {
      alert("Insufficient Balance");
    } else {
      fetch("http://127.0.0.1:3000/update", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data[i]._id,
          Current_Bal: data[i].Current_Bal - balance,
        }),
      }).then((res) => res.json);
      fetch("http://127.0.0.1:3000/update", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data[j]._id,
          Current_Bal: parseInt(data[j].Current_Bal) + parseInt(balance),
        }),
      })
        .then((res) => res.json)
        .then((data) => {
          alert("Succesfully Transfered");
          window.location = "/";
        });
    }
  };
  return (
    <div className="boxtransfer">
      <div className="header" style={{ marginTop: 20 }}>
        <span className="span1">Transfer Money</span>
      </div>
      <div className="box3">
        <div className="autosuggest">
          <AutoSuggest
            name="From"
            options={Names}
            handleChange={setMakefrom}
            value={makefrom}
          />
        </div>
        <div className="autosuggest">
          <AutoSuggest
            name="To"
            options={Names}
            handleChange={setMaketo}
            value={maketo}
          />
        </div>
      </div>
      <div className="inputamount">
        <text style={{ fontSize: 20 }}>Amount</text>
        <input
          type="Number"
          className="inputamt"
          value={balance}
          onChange={(event) => setBalance(event.target.value)}
        />
      </div>
      <div className="box5">
        <button className="btn" onClick={update}>
          Transfer
        </button>
      </div>
    </div>
  );
}

export default TransferMoney;
