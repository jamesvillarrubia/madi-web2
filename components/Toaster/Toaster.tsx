/** AUTO-SUMMARY **
   Purpose: This file defines a Toaster component that manages and displays toast notifications in the project.

   Key Components:
   - `Toaster`: A React component that uses the `useToast` hook to render toast notifications.
   - `ToastProvider`, `Toast`, `ToastTitle`, `ToastDescription`, `ToastClose`, `ToastViewport`: Components imported from `@radix-ui/react-toast` used to structure and manage the toast notifications.

   Functional Overview: The Toaster component fetches toast data using the `useToast` hook and renders each toast using the `Toast` component. It includes dynamic styling and animations for the toast notifications and provides a viewport for them. Each toast can have a title, description, and an action component, and can be dismissed using the `ToastClose` button.

   Dependencies and Integrations: 
   - Uses `@radix-ui/react-toast` for toast UI components.
   - Integrates with the `useToast` custom hook from the same project to manage the state and logic of toast notifications.

   Additional Context: The component is designed to be responsive and accessible, with careful attention to animation, layout, and accessibility features like ARIA labels.
*** END-SUMMARY **/
'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@radix-ui/react-toast'
import { useToast } from './useToast'

export const Toaster = () => {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            className="bg-white dark:bg-slate-800 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
            {...props}
          >
            <div>
              {title && (
                <ToastTitle className="[grid-area:_title] mb-[5px] font-medium text-slate12 break-words text-[15px]">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="break-words">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose aria-label="Close">
              <span aria-hidden>×</span>
            </ToastClose>
          </Toast>
        )
      })}
      <ToastViewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </ToastProvider>
  )
}
