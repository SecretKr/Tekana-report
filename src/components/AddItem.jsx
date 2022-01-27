import React, {useState} from "react"

function AddItem({updateItem}) {
  const [name, setName] = useState()
  const [size, setSize] = useState()
  const [suffix, setSuffix] = useState()
  const [price, setPrice] = useState()

  return (
    <div className="item-add">
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
      <input type="text" placeholder="Size" onChange={(e) => setSize(e.target.value)}></input>
      <input type="text" placeholder="Suffix" onChange={(e) => setSuffix(e.target.value)}></input>
      <input type="float" placeholder="Price" onChange={(e) => setPrice(e.target.value)}></input><br></br>
      <button className="add-btn" onClick={() => updateItem(name, size, suffix, price)}>Add</button>
    </div>
  )
}

export default AddItem
