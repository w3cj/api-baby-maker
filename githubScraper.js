var apis = [];
$('td').each(function() {
  if (this.textContent.trim() == "Go!") {
    var name = $(this).siblings()[0].textContent;
    var url = $(this).find('a').attr('href');
    apis.push({name: name, url: url})
  }
})
