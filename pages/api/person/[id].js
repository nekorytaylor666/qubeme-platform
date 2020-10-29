import { db } from '../../../utils/firebase';

export default async (req, res) => {
	const { id } = req.query;
	const document = db.collection('users').doc(id);
	const doc = await document.get();
	const data = doc.data();
	res.statusCode = 200;
	res.json(data);
};
