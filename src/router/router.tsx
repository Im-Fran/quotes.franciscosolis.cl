import {createBrowserRouter} from "react-router-dom";
import Layout from "@/components/layout/layout.tsx";
import {lazy, Suspense} from "react";
import {RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";
import Loading from "@/pages/loading.tsx";

const Home = lazy(() => import("@/pages/home/home.tsx"));
const QuoteIndex = lazy(() => import("@/pages/quote/quote-index.tsx"));

const routes = [
  {
    path: "/",
    element: <div className={"min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition duration-300"}>
      <SignedOut children={<RedirectToSignIn/>}/>
      <SignedIn children={<Layout/>}/>
    </div>,
    children: [
      /* Home */
      {
        index: true,
        element: <Suspense fallback={<Loading/>}>
          <Home/>
        </Suspense>,
      },

      /* Quotes */
      {
        path: "/quote/:id",
        element: <Suspense fallback={<Loading/>}><QuoteIndex/></Suspense>,
      }
    ],
  },
];


const router = createBrowserRouter(routes, {
  basename: '/',
});

export default router;