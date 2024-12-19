import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import router from "@/router/router";
import {ClerkProvider} from "@clerk/clerk-react";
import "@radix-ui/themes/styles.css";
import './index.css'

/* dayjs */
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import es from 'dayjs/locale/es'
dayjs.locale(es)
dayjs.extend(relativeTime)

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}

createRoot(document.getElementById('root')!).render(<StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
    <RouterProvider router={router}/>
  </ClerkProvider>
</StrictMode>)
