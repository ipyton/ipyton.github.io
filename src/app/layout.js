// app/layout.js
import '../styles/globals.css'
import { LanguageProvider } from './contexts/LanguageContext'

export const metadata = {
  title: 'Noah',
  description: 'Welcome to my app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
 