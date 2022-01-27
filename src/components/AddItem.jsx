import React, {useState} from "react"

function AddItem({updateItem}) {
  const [name, setName] = useState("")
  const [size, setSize] = useState("")
  const [price, setPrice] = useState("")

  const addItemHandler = () => {
    if (name.trim() !== "" && size !== "" && price !== "" && !isNaN(price)){
      updateItem(name.trim(), size, price)
      setSize("")
      setPrice("")
    }
  }

  return (
    <div className="item-add-container">
      <div className="item-add">
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
      <input type="text" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)}></input>
      <input type="float" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}></input><br></br>
      <button className="add-btn" onClick={addItemHandler}>Add</button>
      </div>
    </div>
  )
}

export default AddItem
