import { useEffect, useRef, useState, useCallback } from 'react';
import { getKycAccessToken } from '@/lib/api';

// Sumsub WebSDK types
declare global {
  interface Window {
    snsWebSdk?: {
      init: (
        accessToken: string,
        getNewAccessToken: () => Promise<string>
      ) => {
        withConf: (conf: SumsubConfig) => {
          withOptions: (options: SumsubOptions) => {
            on: (event: string, callback: (...args: unknown[]) => void) => ReturnType<typeof window.snsWebSdk.init>['withConf'];
            build: () => {
              launch: (container: HTMLElement) => void;
            };
          };
        };
      };
    };
  }
}

interface SumsubConfig {
  lang?: string;
  theme?: 'light' | 'dark';
}

interface SumsubOptions {
  addViewportTag?: boolean;
  adaptIframeHeight?: boolean;
}

interface KYCVerificationProps {
  userId: string;
  email?: string;
  onComplete?: () => void;
  onError?: (error: string) => void;
}

export function KYCVerification({ userId, email, onComplete, onError }: KYCVerificationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const launchedRef = useRef(false);

  // Load Sumsub WebSDK script
  useEffect(() => {
    const scriptId = 'sumsub-websdk';
    
    if (document.getElementById(scriptId)) {
      setSdkLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://static.sumsub.com/idensic/static/sns-websdk-builder.js';
    script.async = true;
    script.onload = () => {
      setSdkLoaded(true);
    };
    script.onerror = () => {
      setError('Failed to load verification SDK');
      setIsLoading(false);
    };
    
    document.body.appendChild(script);
  }, []);

  // Get access token
  const getAccessToken = useCallback(async (): Promise<string> => {
    const result = await getKycAccessToken(userId);
    if (!result.success || !result.token) {
      throw new Error(result.error || 'Failed to get access token');
    }
    return result.token;
  }, [userId]);

  // Initialize Sumsub SDK
  useEffect(() => {
    if (!sdkLoaded || !containerRef.current || launchedRef.current) return;

    const initSdk = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const accessToken = await getAccessToken();

        if (!window.snsWebSdk) {
          throw new Error('Sumsub SDK not loaded');
        }

        const snsWebSdkInstance = window.snsWebSdk
          .init(
            accessToken,
            // Token expiration handler - get new token
            async () => {
              const newToken = await getAccessToken();
              return newToken;
            }
          )
          .withConf({
            lang: 'en',
            theme: 'light', // Light theme to match dashboard
          })
          .withOptions({
            addViewportTag: false,
            adaptIframeHeight: true,
          })
          .on('idCheck.onStepCompleted', (payload: unknown) => {
            console.log('Step completed:', payload);
          })
          .on('idCheck.onApplicantStatusChanged', (payload: unknown) => {
            console.log('Status changed:', payload);
          })
          .on('idCheck.onApplicantSubmitted', () => {
            console.log('Applicant submitted');
            onComplete?.();
          })
          .on('idCheck.onApplicantResubmitted', () => {
            console.log('Applicant resubmitted');
            onComplete?.();
          })
          .on('idCheck.onError', (error: unknown) => {
            console.error('SDK error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Verification error occurred';
            setError(errorMessage);
            onError?.(errorMessage);
          })
          .build();

        if (containerRef.current) {
          launchedRef.current = true;
          snsWebSdkInstance.launch(containerRef.current);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing Sumsub SDK:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize verification';
        setError(errorMessage);
        setIsLoading(false);
        onError?.(errorMessage);
      }
    };

    initSdk();
  }, [sdkLoaded, getAccessToken, onComplete, onError]);

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">Verification Error</h3>
        <p className="text-muted-foreground text-sm mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-violet-600 hover:text-violet-700 font-medium text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-[500px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground text-sm">Loading verification...</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="sumsub-container"
        style={{ minHeight: '500px' }}
      />
      <style>{`
        .sumsub-container iframe {
          border-radius: 12px;
          background: white;
        }
      `}</style>
    </div>
  );
}
