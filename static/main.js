"use strict";

window.facebookPixelLoaded = false;

$(document).ready(function() {
  loadFacebookPixel();

  // Main
  trackEvent("action:ajaxify.end", "track", "PageView");
  trackEvent("action:ajaxify.contentLoaded", "track", "ViewContent");

  // Composer-related
  trackEvent("action:composer.topic.new", "trackCustom", "CreateNewTopic");
  trackEvent("action:composer.post.edit", "trackCustom", "EditPost");
  trackEvent("action:composer.addQuote", "trackCustom", "AddQuote");
  trackEvent("action:composer.post.new", "trackCustom", "CreateNewPost");
  trackEvent("action:composer.addQuote", "trackCustom", "AddQuote");

  // Content Loading
  trackEvent("action:posts.loaded", "trackCustom", "PostsLoaded");
  trackEvent("action:topics.loaded", "trackCustom", "TopicsLoaded");
  trackEvent("action:category.loaded", "trackCustom", "CategoryLoaded");

  // Profile-related
  trackEvent("action:app.loggedIn", "trackCustom", "LoggedIn");
  trackEvent("action:app:loggedOut", "trackCustom", "Logout");
  trackEvent("action:profile.update", "trackCustom", "UpdateProfile");

  // Search and querying
  trackEvent("action:search.fillOutForm", "track", "Search");
  trackEvent("action:infinitescroll.loadmore", "trackCustom", "LoadMore");

  // Chat-related
  trackEvent("action:chat.renamed", "trackCustom", "ChatRenamed");
  trackEvent("action:chat.loaded", "trackCustom", "ChatLoaded");
  trackEvent("action:chat.closed", "trackCustom", "ChatClosed");
  trackEvent("action:chat.minimized", "trackCustom", "ChatMinimized");
  trackEvent("action:chat.sent", "trackCustom", "SendChatMessage");
  trackEvent("action:chat.received", "trackCustom", "ReceiveChatMessage");
});

function trackEvent(hook, trackOrCallback, event, options) {
  var args = arguments;
  $(window).on(
    hook,
    typeof trackOrCallback === "function"
      ? trackOrCallback
      : function() {
          fbq(args[1], args[2], args[3] ? args[3] : {});
        }
  );
}

function loadFacebookPixel() {
  var settings = window.config.facebookPixel;

  if (!window.facebookPixelLoaded && settings && settings.pixel_id) {
    !(function(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    window.facebookPixelLoaded = true;
    fbq("init", settings.pixel_id);
    fbq("track", "PageView");
  } else {
    console.error("No Facebook Pixel ID has been set.");
  }
}
