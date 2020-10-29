// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as admin from 'firebase-admin';

var serviceAccount = require('../serviceAccountKey.json');
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
}

export const db = admin.firestore();
