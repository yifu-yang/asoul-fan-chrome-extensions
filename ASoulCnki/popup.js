let changeColor = document.getElementById("changeColor");



chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});


// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    //document.body.style.backgroundColor = color;
    let users = document.querySelectorAll("a.name");
    let bid = "5468612";
    let followingList = "https://api.bilibili.com/x/relation/followings?vmid=" + bid + "&pn=1&ps=2000&order=desc&order_type=attention&jsonp=jsonp";//&callback=__jp5";
    var xhr = new XMLHttpRequest();
    xhr.open('get', followingList);
    xhr.withCredentials = true;
    xhr.send(null);
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4) return;
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseText;
        var result = JSON.parse(res);
        console.log(result);
        if(result.code === 22115){
          console.log("无法查看用户关注列表")
        }
        result.data.list.forEach(element => {
          if (element.mid === 351609538) {
            console.log("皇珈骑士");
          }
        });
      } else {
        console.error('服务器错误');
      }
    }
    /*for (let user of users) {
    console.log(user);
    let bid = user.dataset.usercardMid;
    console.log(bid);
    let followingList = "https://api.bilibili.com/x/relation/followings?vmid=" + bid + "&pn=1&ps=2000&order=desc&order_type=attention&jsonp=jsonp&callback=__jp5";
    let ref = "https://space.bilibili.com/"+bid+"/fans/follow";
    var xhr = new XMLHttpRequest();
    xhr.open('get', followingList);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Referer', ref);
    xhr.send(null);
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4) return;
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseText;
        console.log(res);
      } else {
        console.error('服务器错误');
      }
    }
  }*/
  });
}

