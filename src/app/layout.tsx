
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Carblau | Tu coche ideal, sin complicaciones',
  description: 'No somos una tienda de coches al uso. Encontramos el vehículo que mejor se adapta a tu estilo de vida y necesidades.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
