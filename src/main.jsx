import ReactDOM from 'react-dom/client';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);