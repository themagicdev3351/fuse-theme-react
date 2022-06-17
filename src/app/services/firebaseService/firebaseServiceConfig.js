const prodConfig = {
  apiKey: "AIzaSyA2zoq6hh9IeEdQ-vhm_hH4KyQ5woif3aY",
  authDomain: "react-fuse-theme.firebaseapp.com",
  projectId: "react-fuse-theme",
  storageBucket: "react-fuse-theme.appspot.com",
  messagingSenderId: "44678101687",
  appId: "1:44678101687:web:350325fae2f46b92cf6b32",
  measusrementId: "G-P1GWY7G0J0",
  databaseURL: "https://react-fuse-theme-default-rtdb.firebaseio.com/",
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
