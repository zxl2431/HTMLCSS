(function flexible(window, document) { 
  //获取html的根元素
  let docEl = document.documentElement;
  //dpr 物理像素比
  let dpr = window.devicePixelRatio || 1;

  //设置我们body的字体大小
  function setBodyFontSize() { 
    // 如果页面有这个元素就设置body字体大小
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px';
    } else { 
      // 如果页面没有body元素, 那等值我们主要的DOM元素加载完成再去设置body 
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // 设置html元素的文字大小 set 1rem = viewWidth / 10
  function setRemUnit() { 
    let rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + 'px';
  }

  setRemUnit();

  // 当页面尺寸发生变化的时候, 要重新设置下rem的大小
  window.addEventListener('resize', setRemUnit);
  // pageshow 是我们重新加载页面触发的事件
  window.addEventListener('pageshow', function (e) { 
    if (e.persisted) { 
      setRemUnit()
    }
  })

  // detect 0.5px supports  有些移动端的浏览器不支持0.5像素的写法
  if (dpr >= 2) { 
    let fakeBody = document.createElement('body');
    let testElement = document.createElement('div');
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
        docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)

  }

}(window, document))