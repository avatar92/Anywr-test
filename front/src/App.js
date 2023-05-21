import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Public from './components/public';

import NavigationBar from './components/widgets/header';
import AppLayout from './layout/app-laoyut';
import Home from './pages/home';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          element: <Public> <Home /> </Public>,
          path: "",
        },
      ]
    }
  ]
)


function App() {
  return  <RouterProvider router={router} />;
}

export default App;
