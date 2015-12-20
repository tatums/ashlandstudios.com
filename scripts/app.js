var xhttp = new XMLHttpRequest();

//var element = document.getElementById("blog");
function loadBlog(entries) {
  var template = $('#entry-template').html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, {entries: entries});
  $('#blog').html(rendered);
}

xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    //document.getElementById("feed").innerHTML = xhttp.responseText;

    var entries = xhttp.responseXML.getElementsByTagName('entry')
    //console.log({entries: entries})
    //loadBlog(entries);
    go(entries);

  }
};

xhttp.open("GET", "http://www.tatum.im/atom.xml", true);
xhttp.send();


var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];

function go (items) {

    for (i = 0; i < items.length; i++) {

      var item = items[i]
      window.item = item;
      var element = document.getElementById("blog");
      var div = document.createElement('div')
      div.setAttribute('class', 'entry');

      var heading = document.createElement('div')
      heading.setAttribute('class', 'entry-heading');

      var h2 = document.createElement('h2')
      h2.setAttribute('class', 'entry-heading');
      h2.innerHTML =  item.getElementsByTagName("title")[0].childNodes[0].nodeValue;

      var date = document.createElement('div')
      date.setAttribute('class', 'date');

      var d = new Date(window.item.getElementsByTagName("updated")[0].childNodes[0].nodeValue);

      var dateMonth = document.createElement('div')
      dateMonth.setAttribute('class', 'month');
      dateMonth.innerHTML = monthNames[d.getMonth()];

      var dateDay = document.createElement('div')
      dateDay.setAttribute('class', 'day');
      dateDay.innerHTML = d.getDate();

      var dateYear = document.createElement('div')
      dateYear.setAttribute('class', 'year');
      dateYear.innerHTML = d.getFullYear();

      date.appendChild(dateMonth);
      date.appendChild(dateDay);
      date.appendChild(dateYear);

      heading.appendChild(date);
      heading.appendChild(h2);

      var h2A = document.createElement('a')
      h2A.setAttribute('class', 'entry-heading');

      var content = document.createElement('div')
      content.setAttribute('class', 'entry-content');

      div.appendChild(heading);
      div.appendChild(content);

      content.innerHTML = item.getElementsByTagName("content")[0].childNodes[0].nodeValue;

      element.appendChild(div);
    }
}

