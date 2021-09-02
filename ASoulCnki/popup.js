// Copyright 2021 Google LLC
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd

// Search the bookmarks when entering the search keyword.
$('#search').on("click", function () {
  //console.log($('#asoultext').val());

  $.ajax({
    method: "POST",
    url: "https://asoulcnki.asia/v1/api/check",
    contentType: 'application/json',
    data: JSON.stringify({
      "text": $('#asoultext').val()
    }),
    success: function (data) {
      console.log(data);
      if (data.code != 0) {
        $('#result').html("你的输入有误，请重试</br>");
        return;
      }
      if (data.data.related.length == 0) { 
        $('#result').html("恭喜你，你的是原创小作文，请继续保持！</br>"); 
      }else{
        let result = '';
        result += "重复率：" + data.data.rate + "</br>";
        let relatedText = data.data.related[0]
        let source = relatedText.reply_url;
        let ctime = new Date(parseInt(relatedText.reply.ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        $('#result').html(result+"相似评论："+source+"</br>"+"创建时间: "+ctime+"</br>");
      }
      $('#result').html("创建时间: "+ctime+"</br>");
    }
  });
});
