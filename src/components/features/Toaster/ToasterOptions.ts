/* These options are spreaded across the Toaster component in App.tsx */

export const toasterOptions = {
  position: 'top-center' as const,
  reverseOrder: false,
  gutter: 8,
  containerClassName: '',
  containerStyle: {},
  toastOptions: {
    className: '',
    duration: 5000,
    removeDelay: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'rgba(23, 178, 106, 1)',
        secondary: 'rgba(23, 178, 106, 1)',
      },
    },
    error: {
      duration: 3000,
      iconTheme: {
        primary: 'rgba(240,68, 56,1)',
        secondary: 'rgba(240,68, 56,1)',
      },
    },
  },
};
