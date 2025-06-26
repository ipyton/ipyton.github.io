// app/layout.js
import '../styles/globals.css'

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
 