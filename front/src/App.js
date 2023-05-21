import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Protected from './components/protected';
import Public from './components/public';

import NavigationBar from './components/widgets/header';
import AppLayout from './layout/app-laoyut';
import Home from './pages/home';
import Profile from './pages/profile';
import SignUp from './pages/signup';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Public> <AppLayout /> </Public>,
      children: [
        {
          element:  <Home /> ,
          path: "",
        },
        {
          element: <SignUp />,
          path: "/sign-up",
        },
      ]
    },
    {
      path: "/dashboard",
      element: <Protected> <AppLayout /> </Protected>,
      children: [
        {
          element: <Profile />,
          path: "profile",
        },
      ]
    }
  ]
)


function App() {
  return  <RouterProvider router={router} />;
}

export default App;
