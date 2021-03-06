import React, { useState, useEffect } from "react"
import ImageUpload from "./ImageUpload"
const axios = require('axios')
//const lineNotify = require('line-notify-nodejs')('yuIausaLVPLFp9wgKu7AZCAe9pAIe38En9bj4ndeWXZ');

function SelectedItemList({myItem, setImage, removeMyItem}) {
  const [myItemd, setMyItemd] = useState([])

  useEffect(() => {
    const newList = [...myItem]
    var total = 0
    var i
    for(i = 0;i < myItem.length;i++) {
      total += myItem[i].qnt*myItem[i].price
    }
    if(myItem.length < 9){
      for(i = 0;i < 9-myItem.length;i++) {
        newList.push({idx:"dummy"+i})
      }
    }
    if(myItem.length) newList.push({qnt:1, price:total, idx:"total"})
    else newList.push({idx:"dummy9"})
    setMyItemd(newList)
  }, [myItem])

  const sendToLine = () => {
    const canvasSave = document.getElementById("resetCanvas")
    const d = canvasSave.toDataURL('image/png')
    //const w = window.open('about:blank', 'image from canvas')
    //w.document.write("<img src='"+d+"' alt='from canvas'/>")
    axios({
      url:d,
      method:'GET',
      responseType: 'blob'
    })
    .then((response) => {
        const url = window.URL
        .createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Report.png');
                document.body.appendChild(link);
                link.click();
    })
  }

  return (
    <div className="summary">
      <div className="item-cart">
        {myItemd.map((item) => (
          <div className="item" key={item.idx}>
            <span className="item-name">{item.name}</span>
            <span className="item-size">{item.size}{item.suffix} {item.qnt > 1 ? "x"+item.qnt : ""}</span>
            <span className="item-price">{item.qnt ? item.price * item.qnt : ""}</span>
            {item.name != null && <button className="item-delete" onClick={() => removeMyItem(item.idx)}><i className="fas fa-trash"></i></button>}
          </div>
        ))}
        <div className="frame"></div>
      <ImageUpload 
        setImage={setImage}
        />
      <button className="send" onClick={sendToLine}>Save</button>
        </div>
    </div>
  )
}

export default SelectedItemList