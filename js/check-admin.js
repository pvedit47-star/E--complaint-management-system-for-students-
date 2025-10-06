// check-admin.js
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const email = process.argv[2];

if (!email) {
  console.log("Error: Please provide an email address.");
  process.exit(1);
}

async function checkAdminClaim() {
  try {
    const user = await admin.auth().getUserByEmail(email);
    console.log(`--- Claims for ${email} ---`);
    console.log(user.customClaims);
    console.log('--------------------------');
    process.exit(0);
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    process.exit(1);
  }
}

checkAdminClaim();