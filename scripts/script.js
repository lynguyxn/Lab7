// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const title = document.querySelector("header h1");
const settingsIcon = document.querySelector("header img");

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register("/Lab7/sw.js").then((registration) => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (err) => {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        const postId = document.querySelector('main').childElementCount.toString();
        newPost.addEventListener('click', () => {
          setState({ page: "entry", postId, entry }, false);
        })
      });
    });
});

title.addEventListener('click', () => {
  setState({ page: "home" }, false);
});

settingsIcon.addEventListener('click', () => {
  setState({ page: "settings" }, false);
});

window.addEventListener('popstate', (e) => {
  if (history.state !== null) {
    setState(history.state, true);
  } else {
    setState({ page: "home" }, true);
  }
});
