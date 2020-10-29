// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as admin from 'firebase-admin';

var serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
