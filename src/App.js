import React, {
	useEffect,
	useState,
	unstable_useTransition as useTransition,
	lazy,
	Suspense
} from 'react';
import { Spinner } from 'reactstrap';

import { createPhotosResource } from './modules/photoLoading';

const PhotoList = lazy(() => import('./components/PhotoList.js'));

export default () => {
	const [photosResource, setPhotosResource] = useState({
		read: () => ([]) // start with return of same data structure we want
	});
	const [startTransition, isPending] = useTransition(500);

	useEffect(() => {
		const tid = setTimeout(() => {
			startTransition(() => {
				setPhotosResource(createPhotosResource());
			});
		}, 10000);

		return () => clearTimeout(tid);
	}, []);

	return (
		<div>
			<h1>My Sample App</h1>
			<p>Some content here to digest...</p>
			<Suspense fallback={<Spinner animation="border" />}>
				<PhotoList
					resource={photosResource}
					pending={isPending}
				/>
			</Suspense>
		</div>
	);
};
