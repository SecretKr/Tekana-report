import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue} from "firebase/database"
import firebaseConfig from "../config"
import React, {useState, useEffect} from "react"

import ItemContainer from "./ItemContainer"
import SelectedItemList from "./SelectedItemList"
import CombineImage from "./CombineImage"

function App() {
  const app = initializeApp(firebaseConfig)
  const db = getDatabase(app)

  const [itemList, setItemList] = useState([])
  const [myItem, setMyItem] = useState([])
  const [image, setImage] = useState(null)

  useEffect(() => {
    onValue(ref(db, 'data'), (snapshot) => {
      const items = []
      snapshot.forEach((doc) => {
        doc.forEach((item) => {
          items.push({ name:doc.key, id:item.key, size:item.val().size, price:item.val().price, suffix:item.val().suffix, qnt:0 })
        })
      })
      setItemList(items)
    })
  }, [db])

  const removeMyItem = (index) => {
    var newMyItem = myItem.filter((i) => i.idx !== index)
    setMyItem(newMyItem)
  }

  return (
    <div className="App">
      <ItemContainer
        itemList={itemList}
        myItem={myItem}
        setMyItem={setMyItem}
      />
      <SelectedItemList
        myItem={myItem}
        setImage={setImage}
        removeMyItem={removeMyItem}
      />
      <CombineImage
        image={image}
        myItem={myItem}
      />
    </div>
  );
}

export default App;
