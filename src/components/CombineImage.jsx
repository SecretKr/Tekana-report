import React, { useEffect, useRef } from 'react';

export default function CombineImage({image, myItem}) {
  const canvas = useRef(null)

  useEffect(() => {
    if(image && canvas) {
      const ctx = canvas.current.getContext('2d')
      ctx.fillStyle = "#D3DEDC"
      ctx.fillRect(0, 0, 1440, 2160)
      var imgRatio = image.width / image.height
      ctx.drawImage(image, 1440-imgRatio*1280, 0, imgRatio*1280, 1280)
      ctx.font = "72px Arial"
      ctx.textAlign = "left"
      ctx.fillStyle = "#082a31"
      var lineHeight = 80
      var y = 1400
      var x = 40
      var total = 0
      for(var i = 0;i < myItem.length;i++) {
        var tQnt
        if(myItem[i].qnt === 1) tQnt = " "
        else tQnt = " x" + myItem[i].qnt
        //ctx.fillText(myItem[i].name+" "+myItem[i].size+myItem[i].suffix+tQnt+" ="+myItem[i].qnt*myItem[i].price+".-",x,y)
        ctx.fillText(myItem[i].name+" "+myItem[i].size+myItem[i].suffix+tQnt,x,y)
        ctx.fillText("="+myItem[i].qnt*myItem[i].price+".-",1080,y)
        total += myItem[i].qnt*myItem[i].price
        y+=lineHeight
      }
      ctx.fillStyle = "#124f5a"
      ctx.fillText("   ==="+total+".-",x,y+40)
    }
  }, [image, canvas, myItem])

  return (
    <div className="canvas">
      <canvas
        id="resetCanvas"
        ref={canvas}
        width={1440}
        height={2160}
      />
    </div>
  )
}

