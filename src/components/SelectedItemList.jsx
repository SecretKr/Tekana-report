import React, { useState, useEffect } from "react"
import ImageUpload from "./ImageUpload"
const lineNotify = require('line-notify-nodejs')('yuIausaLVPLFp9wgKu7AZCAe9pAIe38En9bj4ndeWXZ');
// const LineNotify = require("../lineNotify/client");

// const ACCESS_TOKEN = "yuIausaLVPLFp9wgKu7AZCAe9pAIe38En9bj4ndeWXZ";
// const notify = new LineNotify(`${ACCESS_TOKEN}`);

function SelectedItemList({myItem, setImage, removeMyItem}) {
  const [myItemd, setMyItemd] = useState([])

  useEffect(() => {
    const newList = [...myItem]
    if(myItem.length < 10){
      for(var i = 0;i < 10-myItem.length;i++) {
        newList.push({idx:"dummy"+i})
      }
    }
    setMyItemd(newList)
  }, [myItem])

  const sendToLine = () => {
    const canvasSave = document.getElementById("resetCanvas")
    const d = canvasSave.toDataURL('image/png')
    //notify.sendImage(d)
    lineNotify.notify({
      message: " ",
      imageFile: d
    })
  }

  return (
    <div className="summary">
      <div className="item-cart">
        {myItemd.map((item) => (
          <div className="item" key={item.idx}>
            <span className="item-name">{item.name}</span>
            <span className="item-size">{item.size}{item.suffix} {item.qnt ? "x"+item.qnt : ""}</span>
            <span className="item-price">{item.qnt ? item.price * item.qnt : ""}</span>
            {item.name != null && <button className="item-delete" onClick={() => removeMyItem(item.idx)}><i className="fas fa-trash"></i></button>}
          </div>
        ))}
        <div className="frame"></div>
      <ImageUpload 
        setImage={setImage}
        />
      <button className="send" onClick={sendToLine}>Send</button>
        </div>
    </div>
  )
}

export default SelectedItemList