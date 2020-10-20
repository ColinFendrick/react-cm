// function fetchPhotos() {
// 	return fetch('https://jsonplaceholder.typicode.com/photos')
// 		.then((res) => res.json());
// }

const fetchPhotos = async () => {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/photos');

		if (!res.ok) {
			const message = `An error has occured: ${res.status}`;
			throw new Error(message);
		}

		return res.json();
	} catch (e) {
		throw new Error(e.response.message);
	}
};

export const createPhotosResource = async () => {
	let status = 'pending';
	let result = undefined;

	try {
		const photos = await fetchPhotos();
		status = 'success';
		result = photos;

		var read = () => {
			switch (status) {
			case 'pending':
				throw photos;
			case 'error':
				throw result;
			case 'success':
				return result;
			}
		};

		return { read };
	} catch (e) {
		status = 'error';
		result = e;
		console.log('createphotoerror from fetchpghotos:', e);

		return { read };
	}

	// const suspender = fetchPhotos().then(
	// 	(photos) => {
	// 		status = 'success';
	// 		result = photos;
	// 	},
	// 	(error) => {
	// 		status = 'error';
	// 		result = error;
	// 	}
	// );

	// return {
	// 	read() {
	// 		switch (status) {
	// 		case 'pending':
	// 			throw suspender;
	// 		case 'error':
	// 			throw result;
	// 		case 'success':
	// 			return result;
	// 		}
	// 	}
	// };
};
