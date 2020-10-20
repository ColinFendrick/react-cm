import React, { useState, useEffect } from 'react';

export default ({ resource }) => {
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		(async () => {
			if (resource) { // comes in as undefined
				try {
					const res = await resource;
					setPhotos(res.read);
				} catch (e) {
					console.log(e);
				}
			}

		})();
	}, [resource]);

	return (
		<div>
			{photos.map((photo) => (
				<div key={photo.id}>
					<a href={photo.url} title={photo.title} target="_blank">
						<img src={photo.thumbnailUrl} />
					</a>
				</div>
			))}
		</div>
	);
};
