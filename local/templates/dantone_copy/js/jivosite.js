(function(){'use strict';window.JSON||(window.JSON={parse:function(sJSON){return eval("("+sJSON+")")},stringify:function(r){if(r instanceof Object){var t="";if(r.constructor===Array){for(var n=0;n<r.length;t+=this.stringify(r[n])+",",n++);return"["+t.substr(0,t.length-1)+"]"}if(r.toString!==Object.prototype.toString)return'"'+r.toString().replace(/"/g,"\\$&")+'"';for(var i in r)t+='"'+i.replace(/"/g,"\\$&")+'":'+this.stringify(r[i])+",";return"{"+t.substr(0,t.length-1)+"}"}return"string"==typeof r?'"'+r.replace(/"/g,"\\$&")+'"':String(r)}});var CURRENT_SCRIPT_ID='amo_jivosite_js';var GLOBAL_WIDGET_ID_KEY='amo_jivosite_id';var App=function(){var _this=this,current_script,host;if(!window[GLOBAL_WIDGET_ID_KEY]){return;}current_script=document.getElementById(CURRENT_SCRIPT_ID);if(!current_script||!current_script.src){return;}host=current_script.src.match(/(http.+\.\w+)\//);if(!host||!host[1]){return;}this.widget_id=window[GLOBAL_WIDGET_ID_KEY];this.pixel_server=host[1].replace(/forms\./,'piper.');this.visitor_uid=null;this.ga_data={ga:{},utm:{},data_source:'jivosite'};this.chat_is_loaded=false;this.identifier_is_loaded=false;this.ga_data_collected=false;this.previous_chat_onload_callback=function(){};this.previous_identifier_onload_callback=function(){};window['AMOPIXEL_IDENTIFIER_PARAMS']=window['AMOPIXEL_IDENTIFIER_PARAMS']||{};if(typeof window['AMOPIXEL_IDENTIFIER_PARAMS']['onload']==='function'){this.previous_identifier_onload_callback=window['AMOPIXEL_IDENTIFIER_PARAMS']['onload'];}window['AMOPIXEL_IDENTIFIER_PARAMS'].onload=function(identifier){_this.handleIdentifierLoad.call(_this,identifier);_this.previous_identifier_onload_callback();};if(typeof window.jivo_onOpen==='function'){this.previous_chat_onload_callback=window.jivo_onOpen;}window.jivo_onOpen=function(){_this.handleChatLoad.apply(_this,arguments);_this.previous_chat_onload_callback();};this.collectUtmData();this.collectGaData();this.loadChat();this.loadIdentifier();};App.prototype.loadChat=function(){var first=document.getElementsByTagName('script')[0];var chat=document.createElement('script');chat.type='text/javascript';chat.async=true;chat.src='https://code.jivosite.com/script/widget/'+this.widget_id;first.parentNode.insertBefore(chat,first);};App.prototype.loadIdentifier=function(){var first=document.getElementsByTagName('script')[0];var pixel=document.createElement('script');pixel.id='amo_pixel_identifier_js';pixel.type='text/javascript';pixel.async=true;pixel.src=this.pixel_server+'/pixel/js/identifier/pixel_identifier.js';first.parentNode.insertBefore(pixel,first);};App.prototype.handleChatLoad=function(){this.chat_is_loaded=true;this.setUserTokenIfNeed();};App.prototype.handleIdentifierLoad=function(identifier){this.identifier_is_loaded=true;var visitor_uid=identifier.getVisitorUid();if(visitor_uid){this.visitor_uid=visitor_uid;this.setUserTokenIfNeed();}};App.prototype.collectUtmData=function(){var
utm_str,utm={};try{utm_str=location.search.match(/utm_source=\w+/)?location.search:document.cookie;utm.source=(utm_str.match(/utm_source=(.+?)(&|[#]|$|;)/)||utm_str.match(/utmcsr=(.+?)[|;]/));utm.medium=(utm_str.match(/utm_medium=(.+?)(&|[#]|$|;)/)||utm_str.match(/utmcmd=(.+?)[|;]/));utm.content=(utm_str.match(/utm_content=(.+?)(&|[#]|$|;)/)||utm_str.match(/utmcct=(.+?)[|;]/));utm.campaign=(utm_str.match(/utm_campaign=(.+?)(&|[#]|$|;)/)||utm_str.match(/utmccn=(.+?)[|;]/));utm.term=(utm_str.match(/utm_term=(.+?)(&|[#]|$|;)/)||utm_str.match(/utmctr=(.+?)[|;]/));this.ga_data.utm.source=(utm.source&&utm.source.length>1)?utm.source[1]:'';this.ga_data.utm.medium=(utm.medium&&utm.medium.length>1)?utm.medium[1]:'';this.ga_data.utm.content=(utm.content&&utm.content.length>1)?utm.content[1]:'';this.ga_data.utm.campaign=(utm.campaign&&utm.campaign.length>1)?utm.campaign[1]:'';this.ga_data.utm.term=(utm.term&&utm.term.length>1)?utm.term[1]:'';}catch(e){}};App.prototype.collectGaData=function(){var _this=this;try{if(typeof window.ga==='function'){window.ga(function(tracker){try{tracker.get=tracker.get||function(param){};_this.ga_data.ga.trackingId=tracker.get('trackingId');_this.ga_data.ga.clientId=tracker.get('clientId');_this.ga_data_collected=true;}catch(e){}_this.setUserTokenIfNeed();});}else if(typeof window._gaq==='object'&&typeof window._gaq.push==='function'){window._gaq.push(function(){try{_this.ga_data.ga.trackingId=window._gat._getTrackerByName()._getAccount();var utmz=document.cookie.match(/__utmz=(.+?)(&|[#]|$|;)/);utmz=(utmz&&utmz[1])?utmz[1]:null;if(utmz){_this.ga_data.ga.clientId=utmz.split('.')[1];}_this.ga_data_collected=true;}catch(e){}_this.setUserTokenIfNeed();});}}catch(e){}};App.prototype.setUserTokenIfNeed=function(){if(!this.ga_data_collected){this.collectGaData();}if(this.visitor_uid&&this.chat_is_loaded&&this.identifier_is_loaded){if(window['jivo_api']){var user_token=JSON.stringify({visitor_uid:this.visitor_uid,ga_data:this.ga_data});window['jivo_api'].setUserToken(user_token);}}};new App();}).call(window);