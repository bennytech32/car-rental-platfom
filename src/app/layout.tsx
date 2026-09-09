// src/app/layout.tsx
import './globals.css';

export const metadata = {
    title: 'B-Tech Car Rental | Dar es Salaam',
    description: 'Smart car rental platform for local and international travelers',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-full flex flex-col" suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}