'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import TrpcProvider from '@/lib/trpc/Provider';
import ClerkSyncUrlCleanup from '@/components/ClerkSyncUrlCleanup';
import ClerkSatelliteSyncGate from '@/components/ClerkSatelliteSyncGate';
import TenantIdInjector from '@/components/TenantIdInjector';
import { TenantSettingsProvider } from '@/components/TenantSettingsProvider';

type GiventaAppProvidersProps = {
  children: React.ReactNode;
  clerkPublishableKey: string;
  clerkProviderProps?: Record<string, unknown>;
};

export default function GiventaAppProviders({
  children,
  clerkPublishableKey,
  clerkProviderProps = {},
}: GiventaAppProvidersProps) {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey} {...clerkProviderProps}>
      <ClerkSyncUrlCleanup />
      <ClerkSatelliteSyncGate />
      <TenantIdInjector />
      <TrpcProvider>
        <TenantSettingsProvider>
          {children}
          <Toaster position="top-right" />
        </TenantSettingsProvider>
      </TrpcProvider>
    </ClerkProvider>
  );
}
