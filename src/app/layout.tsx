// src/app/layout.tsx
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';

export const metadata = {
    title: 'B-Tech Car Rental | International & Multi-Vendor Mobility',
    description: 'Premier car rental platform connecting international travelers and verified local fleet vendors with seamless 50/50 escrow booking.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-full flex flex-col" suppressHydrationWarning>
                <CurrencyProvider>
                    {children}
                </CurrencyProvider>
            </body>
        </html>
    );
}