// src/app/layout.tsx
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
    title: 'B-Tech Car Rental | International & Multi-Vendor Mobility',
    description: 'Premier car rental platform connecting international travelers and verified local fleet vendors with seamless secure escrow booking.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-full flex flex-col" suppressHydrationWarning>
                <ThemeProvider>
                    <CurrencyProvider>
                        {children}
                    </CurrencyProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}