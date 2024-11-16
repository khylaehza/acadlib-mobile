import React, { createContext, useState, useContext, useEffect } from 'react';
import { ref, set, onValue, remove, update } from 'firebase/database';
import { db } from './firebase.config';
import nameGenerator from './utils/nameGenerator';
const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
	const randomName = nameGenerator(16);
	const [loading, setLoading] = useState(false);
	const [prompt, setPrompt] = useState({ stats: '', message: '' });
	const [isVisible, setIsVisible] = useState(false);
	const [curUser, setCurUser] = useState();
	const [books, setBooks] = useState([]);
	const [students, setStudents] = useState([]);
	const [bookmarks, setBookmarks] = useState([]);
	const [toBorrow, setToBorrow] = useState([]);
	const [borrowed, setBorrowed] = useState([]);
	const [history, setHistory] = useState([]);

	const addItem = (newItem, tableName) => {
		const itemData = { ...newItem };

		set(ref(db, `${tableName}/${randomName}`), itemData)
			.then(() => {
				setPrompt({
					stats: 'Successful',
					message: 'Item has been successfully added.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			})
			.catch(() => {
				setPrompt({
					stats: 'Error',
					message: 'Failed to add item. Please try again.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			});
	};

	const deleteItem = (itemId, tableName) => {
		remove(ref(db, `${tableName}/${itemId}`))
			.then(() => {
				setPrompt({
					stats: 'Successful',
					message: 'Item has been successfully deleted.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			})
			.catch(() => {
				setPrompt({
					stats: 'Error',
					message: 'Failed to delete item. Please try again.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			});
	};

	const editItem = (itemId, updatedItem, tableName) => {
		const itemData = { ...updatedItem };

		update(ref(db, `${tableName}/${itemId}`), itemData)
			.then(() => {
				setPrompt({
					stats: 'Successful',
					message: 'Item has been successfully updated.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			})
			.catch(() => {
				setPrompt({
					stats: 'Error',
					message: 'Failed to update item. Please try again.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			});
	};

	useEffect(() => {
		const table = ref(db, 'books');
		const unsubscribe = onValue(
			table,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = Object.entries(snapshot.val()).map(
						([key, value]) => {
							return { key, ...value };
						}
					);
					setBooks(data);
				} else {
					console.log('No data available');
					setBooks([]);
				}
				setLoading(false);
			},
			(error) => {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const table = ref(db, 'students');
		const unsubscribe = onValue(
			table,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = Object.entries(snapshot.val()).map(
						([key, value]) => {
							return { key, ...value };
						}
					);
					setStudents(data);
				} else {
					console.log('No data available');
					setStudents([]);
				}
				setLoading(false);
			},
			(error) => {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const table = ref(db, 'bookmarks');
		const unsubscribe = onValue(
			table,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = Object.entries(snapshot.val()).map(
						([markKey, value]) => {
							return { markKey, ...value };
						}
					);
					setBookmarks(data);
				} else {
					console.log('No data available');
					setBookmarks([]);
				}
				setLoading(false);
			},
			(error) => {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const table = ref(db, 'to-borrow');
		const unsubscribe = onValue(
			table,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = Object.entries(snapshot.val()).map(
						([borrowKey, value]) => {
							return { borrowKey, ...value };
						}
					);
					setToBorrow(data);
				} else {
					console.log('No data available');
					setToBorrow([]);
				}
				setLoading(false);
			},
			(error) => {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const table = ref(db, 'borrowed');
		const unsubscribe = onValue(
			table,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = Object.entries(snapshot.val()).map(
						([borrowedKey, value]) => {
							return { borrowedKey, ...value };
						}
					);
					setBorrowed(data);
				} else {
					console.log('No data available');
					setBorrowed([]);
				}
				setLoading(false);
			},
			(error) => {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const table = ref(db, 'history');
		const unsubscribe = onValue(
			table,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = Object.entries(snapshot.val()).map(
						([historyKey, value]) => {
							return { historyKey, ...value };
						}
					);
					setHistory(data);
				} else {
					console.log('No data available');
					setHistory([]);
				}
				setLoading(false);
			},
			(error) => {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, []);

	return (
		<DataContext.Provider
			value={{
				addItem,
				editItem,
				deleteItem,
				prompt,
				isVisible,
				setIsVisible,
				books,
				students,
				setCurUser,
				curUser,
				bookmarks,
				toBorrow,
				borrowed,
				history,
			}}
		>
			{loading ? <div>Loading...</div> : children}
		</DataContext.Provider>
	);
};
