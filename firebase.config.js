import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
	apiKey: 'AIzaSyBRubJH9qibs4vWTGv0IUHe1fZwVbm-fAc',
	authDomain: 'acadlib-95b51.firebaseapp.com',
	databaseURL:
		'https://acadlib-95b51-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'acadlib-95b51',
	storageBucket: 'acadlib-95b51.appspot.com',
	messagingSenderId: '301841526489',
	appId: '1:301841526489:web:b73d5b9e62e1ee0e6bd8c8',
	measurementId: 'G-Y286FMZR4X',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
