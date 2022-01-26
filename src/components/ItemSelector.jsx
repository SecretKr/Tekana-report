import React from "react"

function ItemSelector({setIsPopup, active, list, setList, setMyItem, myItem, counter, setCounter}){
  
  function close(){
    setIsPopup(false)
  }

  const updateQnt = (id ,value) => {
    const newList = []
    list.map(item => (
      item.id === id ? newList.push({...item, qnt: parseInt(item.qnt)+parseInt(value) < 0 ? 0 : parseInt(item.qnt)+parseInt(value)}):
      newList.push(item)
    ))
    setList(newList)
  }

  const handleQntChange = (id ,event) => {
    const newList = []
    list.map(item => (
      item.id === id ? newList.push({...item, qnt: event.target.value}):
      newList.push(item)
    ))
    setList(newList)
  }

  const handleClickInput = (event) => {
    event.target.select()
  }

  const add = () => {
    const newList = [...myItem]
    var c = counter
    list.map(item => (
      item.qnt > 0 && newList.push({...item, idx: c++})//, console.log(counter), setCounter(counter+1)]
    ))
    setCounter(c)
    setMyItem(newList)
    close()
  }

  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="item-selector">
        <div className="label">
          <span className="label-name">Name</span>
          <span className="label-size"></span>
          <span className="label-price">Price</span>
          <span className="close" onClick={close}>&#10006;</span>
        </div>
        {list.map(item => (
          <div className="item" key={item.id}>
            <span className="item-name">{item.name}</span>
            <span className="item-size">{item.size}{item.suffix}</span>
            <span className="item-price">{item.price}</span>
            <button className="d" onClick={() => updateQnt(item.id, -1)}>-</button>
            <input className="item-qnt" type="number" value={item.qnt} onClick={handleClickInput} onChange={(event) => handleQntChange(item.id, event)}></input>
            <button className="u" onClick={() => updateQnt(item.id, 1)}>+</button>
          </div>
        ))}
        <div className="item">
          <button className="add" onClick={add}>Add</button>
        </div>
        <div className="frame"></div>
      </div>
    </div>
  )
}

export default ItemSelector