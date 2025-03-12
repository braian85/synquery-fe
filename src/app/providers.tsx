'use client';

import React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      {children}
    </ThemeRegistry>
  );
} 