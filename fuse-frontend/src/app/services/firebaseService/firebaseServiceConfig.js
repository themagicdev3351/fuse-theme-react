const prodConfig = {
  apiKey: "AIzaSyBgE_E4jlj4XtL9l5xxFFhKcOGuPx4o9yk",
  authDomain: "fuse-theme-new.firebaseapp.com",
  databaseURL: "https://fuse-theme-new-default-rtdb.firebaseio.com",
  projectId: "fuse-theme-new",
  storageBucket: "fuse-theme-new.appspot.com",
  messagingSenderId: "908265895240",
  appId: "1:908265895240:web:eb9a875cd00b9c8ca76f7d",
  measurementId: "G-3Y1QBZE4BK"
};

const devConfig = {
  // apiKey           : "YOUR_API_KEY",
  // authDomain       : "your-app.firebaseapp.com",
  // databaseURL      : "https://your-app.firebaseio.com",
  // projectId        : "your-app",
  // storageBucket    : "your-app.appspot.com",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

const config = process.env.NODE_ENV === 'development' ? prodConfig : devConfig;


export default config;
