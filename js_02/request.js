function request(url) {
  return new Promise((resolve, reject)=> { 
    setTimeout((url) => { 
      if (url == "baidu") { 
        console.log("访问成功");
        resolve("success")
      }
    }, 2000)
  })
 
}

module.exports = {
  request
}