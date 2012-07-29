var test = function(){
  var n = notification({
    message: "hi",
    title: "my notification",
    click:function(){console.log('clicked');},
    error:function(){alert('oops');}
  });
  n.on('display',function(){console.log('displayed');});
  var n2 = notification({
    message: "hi2",
    title: "my notification2",
    click:function(){console.log('clicked2');},
    error:function(){alert('oops2');}
  });
  n.show();
  setTimeout(function(){
    n2.show();
  },5000);
};
