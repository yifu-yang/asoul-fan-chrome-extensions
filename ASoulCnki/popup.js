// Copyright 2021 Google LLC
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd

// Search the bookmarks when entering the search keyword.
$('#search').on("click", function () {
  console.log($('#asoultext').val());

  $.ajax({
    method: "POST",
    url: "https://asoulcnki.asia/v1/api/check",
    contentType: 'application/json',
    data: JSON.stringify({
      "text": $('#asoultext').val()
    }),
    success: function (data) {
      console.log(data);
    }
  });
});
