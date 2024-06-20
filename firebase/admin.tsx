var admin = require("firebase-admin");

var serviceAccount = require("../jyaluva-prod-firebase-adminsdk-5bn5n-970acd78f3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
