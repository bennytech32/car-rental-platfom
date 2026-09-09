'use client';

import React, { createContext, useContext, useState } from 'react';

type Currency = 'TZS' | 'USD';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatPrice: (amountInTZS: number) => string;
    convertPrice: (amountInTZS: number) => number;
    exchangeRate: number; // TZS per 1 USD
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const TZS_PER_USD = 2600;

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('bt_currency') as Currency | null;
                if (saved === 'USD' || saved === 'TZS') {
                    return saved;
                }
            } catch {
                // ignore
            }
        }
        return 'TZS';
    });

    const setCurrency = (curr: Currency) => {
        setCurrencyState(curr);
        try {
            localStorage.setItem('bt_currency', curr);
        } catch {
            // ignore localStorage failure
        }
    };

    const convertPrice = (amountInTZS: number): number => {
        if (currency === 'USD') {
            return Math.round(amountInTZS / TZS_PER_USD);
        }
        return amountInTZS;
    };

    const formatPrice = (amountInTZS: number): string => {
        if (currency === 'USD') {
            const usd = Math.round(amountInTZS / TZS_PER_USD);
            return `$${usd.toLocaleString()}`;
        }
        return `TZS ${amountInTZS.toLocaleString()}`;
    };

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                setCurrency,
                formatPrice,
                convertPrice,
                exchangeRate: TZS_PER_USD
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        return {
            currency: 'TZS' as Currency,
            setCurrency: () => {},
            formatPrice: (amt: number) => `TZS ${amt.toLocaleString()}`,
            convertPrice: (amt: number) => amt,
            exchangeRate: TZS_PER_USD
        };
    }
    return context;
}
