// app/layout.js
export const metadata = {
  title: 'Noah',
  description: 'Welcome to my app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
 