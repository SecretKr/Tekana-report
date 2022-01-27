import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, child, get, set} from "firebase/database"
import firebaseConfig from "../config"
import React, {useState, useEffect} from "react"

import ItemContainer from "./ItemContainer"
import SelectedItemList from "./SelectedItemList"
import CombineImage from "./CombineImage"
import AddItem from "./AddItem"

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

  async function updateItem(name, size, price) {
    var i = 1
    var f
    await get(child(ref(db), `data/${name}`)).then((snapshot) => {
      if (snapshot.exists()) {
        f = false
      } else {
        f = true
      }
    })

    while (!f) {
      await get(child(ref(db), `data/${name}/${i}`)).then((snapshot) => {
        if (snapshot.exists()){
          i++
        } else {
          f = true
        }
      })
    }

    try{
      await set(ref(db, `data/${name}/${i}`), {
        size: size,
        price: price
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

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
      <AddItem
        updateItem={updateItem}
      />
    </div>
  );
}

export default App;
