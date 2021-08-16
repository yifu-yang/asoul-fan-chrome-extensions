//let color = '#3aa757';


//chrome.runtime.onInstalled.addListener(() => {
//  chrome.storage.sync.set({ color });
//  console.log('Default background color set to %cgreen', `color: ${color}`);
//});
//https://api.bilibili.com/x/relation/followings?vmid=5468612&pn=1&ps=20&order=desc&order_type=attention&jsonp=jsonp&callback=__jp5


function renderPage() {
  let userNames = document.querySelectorAll("a.name");
  for (let user of userNames) {
    let bid = user.dataset.usercardMid;
    let tmp = document.getElementById("fanType" + bid)
    if(tmp !=null){
      tmp.remove();
    }
    let htmlText = "<button id=\"fanType" + bid + "\" data-bid=\"" + bid + "\">成分查询</button>"
    user.parentElement.innerHTML = user.parentElement.innerHTML + htmlText;
    let fanType = document.getElementById("fanType" + bid);
    fanType.addEventListener("click", function (event) {
      let ava = { "name": "顶晚人", "icon": "", "color": "#9AC8E2", "bid": "672346917" };
      let bella = { "name": "贝极星", "icon": "", "color": "#DB7D74", "bid": "672353429" };
      let carol = { "name": "皇珈骑士", "icon": "", "color": "#B8A6D9", "bid": "351609538" };
      let diana = { "name": "嘉心糖", "icon": "", "color": "#E799B0", "bid": "672328094" };
      let eileen = { "name": "乃淇淋", "icon": "", "color": "#576690", "bid": "672342685" };
      let user = event.target;
      let bid = user.dataset.bid;
      var step;
      
      console.log(step);
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
          if (result.code === 22115) {
            console.log("无法查看用户关注列表");
            user.innerHTML = "未公开";
            return;
          }
          let tags = "";
          console.log(result.data.list);
          result.data.list.forEach(element => {
            if (String(element.mid) === ava.bid) {
              tags += ava.name;
              console.log("a");
            }
            if (String(element.mid) === bella.bid) {
              tags += bella.name;
              console.log("b");
            }
            if (String(element.mid) === carol.bid) {
              tags += carol.name;
              console.log("c");
            }
            if (String(element.mid) === diana.bid) {
              tags += diana.name;
              console.log("d");
            }
            if (String(element.mid) === eileen.bid) {
              tags += eileen.name;
              console.log("e");
            }
          });
          if (tags === "") {
            user.innerHTML = "纯路人";
          } else {
            user.innerHTML = tags;
          }
        }
      }

    });
  }
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: renderPage
  });
});



