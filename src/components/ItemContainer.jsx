import React, {useState} from "react"

import ItemSelector from "./ItemSelector"

function ItemContainer({itemList, setMyItem, myItem}) {
  //const [selectedItem, setSelectedItem] = useState()
  const [isPopup, setIsPopup] = useState(false)
  const [list, setList] = useState([])
  const [counter, setCounter] = useState(0)

  const selectItem = (itemName) => {
    //setSelectedItem(itemName)
    setList(itemList.filter(item => item.name === itemName))
    setIsPopup(true)
  }

  return (
    <div>
      <div className="item-container selected">
        {itemList.filter(item => item.id === "1").map(mainItem => (
          <div className="main-item" onClick={() => selectItem(mainItem.name)} key={mainItem.name+mainItem.id}>
            <p>{mainItem.name}</p>
          </div>
        ))}
      </div>
      <ItemSelector
        myItem={myItem}
        setMyItem={setMyItem}
        list={list}
        setList={setList}
        active={isPopup}
        setIsPopup={setIsPopup}
        counter={counter}
        setCounter={setCounter}
      />
    </div>
  )
}

export default ItemContainer