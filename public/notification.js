;(function(name){
  var notifications = this['webkitNotifications'];

  var default_message = "";
  var default_title = "";
  var default_icon = null;

  var supported_string = 'supported',
    on_string = 'on',
    show_string = 'show',
    icon_string = 'icon',
    title_string = 'title',
    message_string = 'message',
    error_string = 'error';

  var special = [icon_string,title_string,message_string];

  var show = function() {
    this.show();
  };

  var on = function(event, callback) {
    this['on'+event] = callback;
  };

  var notification = function(options){
    var notifier, me = {}, i;

    if(notifications && notifications.checkPermission() == 0) {
      message = options[message_string] || default_message;
      title = options[title_string] || default_title;
      icon = options[icon_string] || default_icon;

      notifier = notifications.createNotification(icon,title,message);

      for(i in options) {
        if(options.hasOwnProperty(i)){
          if(special.indexOf(i)==-1) {
            on.call(notifier,i,options[i]);
          }
        }
      }

      me[show_string] = function(){
        notifier.show();
      };

      me[on_string] = function(event, callback){
        on.call(notifier,event,callback)
      };

      me[supported_string] = true;
    }
    else { /* cannot display */
      if(options && options[error_string] && options[error_string].call) {
        options[error_string]();
      }
      me[show_string] = function(){};
      me[on_string] = function(){};
      me[supported_string] = false;
    }

    return me;
  };

  this[name] = notification;
}).call(this,'notification');
