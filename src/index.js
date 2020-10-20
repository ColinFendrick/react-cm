import * as React from 'react';
import { unstable_createRoot as createRoot } from 'react-dom';

import App from './App';

createRoot(
	document.getElementById('root')
).render(<React.StrictMode><App /></React.StrictMode>);
