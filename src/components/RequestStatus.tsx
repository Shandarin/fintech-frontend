import React from 'react';
import { Button, Notice } from './ui';
import { Icon } from './Icon';

/** Shared network-state components. Empty successful responses intentionally render nothing. */
export function RetryNotice({ message, onRetry }: { message?: string; onRetry: () => void }) {
  if (!message) return null;
  return <Notice tone="warning"><span>{message}</span><Button variant="ghost" onClick={onRetry}>重试</Button></Notice>;
}
export function LoadingStatus({ message = '正在加载', className = 'market-loading' }: { message?: string; className?: string }) {
  return <div className={className} role="status"><Icon name="refresh" className="spin" size={16}/>{message}</div>;
}
