require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "tekana-report.firebaseapp.com",
  databaseURL: "https://tekana-report-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tekana-report",
  storageBucket: "tekana-report.appspot.com",
  messagingSenderId: "419725869173",
  appId: "1:419725869173:web:d3ac7c32bb0959b87d383c",
  measurementId: "G-QSLVVXM75J"
};

export default firebaseConfig;