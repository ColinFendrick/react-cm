import React, {
	useEffect,
	useState,
	unstable_useTransition as useTransition,
	lazy,
	Suspense
} from 'react';
import { createPhotosResource } from './modules/photoLoading';

const PhotoList = lazy(() => import('./components/PhotoList.js'));

export default () => {
	const [photosResource, setPhotosResource] = useState();
	const [startTransition, isPending] = useTransition(500);

	useEffect(() => {
		const tid = setTimeout(() => {
			startTransition(() => {
				setPhotosResource(createPhotosResource());
			});
		}, 100);

		return () => clearTimeout(tid);
	}, []);

	return (
		<div>
			<h1>My Sample App</h1>
			<p>Some content here to digest...</p>
			<Suspense fallback={<b>Loading ...</b>}>
				<PhotoList
					resource={photosResource}
					pending={isPending}
				/>
			</Suspense>
		</div>
	);
};
