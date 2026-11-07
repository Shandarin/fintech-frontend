import React, { useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Icon';

export function Button({ children, icon, variant = 'secondary', busy = false, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: string; variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; busy?: boolean }) {
  return <button type="button" {...props} disabled={props.disabled || busy} className={`btn btn-${variant} ${className}`} aria-busy={busy}>{(icon || busy) && <Icon name={busy ? 'refresh' : icon!} size={16} className={busy ? 'spin' : ''}/>} {children}</button>;
}
export function IconButton({ icon, label, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: string; label: string }) {
  return <button type="button" {...props} className={`icon-btn ${props.className || ''}`} title={label} aria-label={label}><Icon name={icon}/></button>;
}
export function Info({ label = '查看说明', children }: { label?: string; children: React.ReactNode }) {
  const id = useId();
  const focused = useRef(false);
  const [open, setOpen] = useState(false);
  return <span className="info-tip" onMouseEnter={() => setOpen(true)} onMouseLeave={() => { if (!focused.current) setOpen(false); }}><button type="button" aria-label={label} aria-describedby={open ? id : undefined} aria-expanded={open} onFocus={() => { focused.current = true; setOpen(true); }} onBlur={() => { focused.current = false; setOpen(false); }} onClick={() => setOpen(true)} onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false); } }}><Icon name="info" size={16}/></button>{open && <span id={id} role="tooltip" className="info-tip-content">{children}</span>}</span>;
}
export function Badge({ children, tone = 'neutral', dot = false }: { children: React.ReactNode; tone?: string; dot?: boolean }) { return <span className={`badge badge-${tone}`}>{dot && <span className="status-dot"/>}{children}</span>; }
export function Card({ title, subtitle, action, children, className = '', ...props }: React.HTMLAttributes<HTMLElement> & { title?: string; subtitle?: string; action?: React.ReactNode }) {
  return <section className={`card ${className}`} {...props}>{title && <div className="card-head"><div className="card-title"><h3>{title}</h3>{subtitle && <Info label={`${title}说明`}>{subtitle}</Info>}</div>{action}</div>}{children}</section>;
}
export function PageHead({ title, actions }: { title: string; actions?: React.ReactNode }) { return <div className="page-head"><h1>{title}</h1>{actions && <div className="head-actions">{actions}</div>}</div>; }
export function Tabs({ items, value, onChange }: { items: { id: string; label: string; count?: number }[]; value: string; onChange: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  return <div ref={ref} className="tabs" role="tablist" onKeyDown={e => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const index = items.findIndex(item => item.id === value);
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : (index + (e.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    onChange(items[next].id); ref.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }}>{items.map(item => <button type="button" role="tab" tabIndex={value === item.id ? 0 : -1} aria-selected={value === item.id} key={item.id} onClick={() => onChange(item.id)} className={value === item.id ? 'active' : ''}>{item.label}{item.count !== undefined && item.count > 0 && <span>{item.count}</span>}</button>)}</div>;
}
export function Empty(_props: { title?: string; description?: string; action?: React.ReactNode }) { return null; }
export function Notice({ children, tone = 'info' }: { children: React.ReactNode; tone?: 'info' | 'warning' | 'success' }) { return <div className={`notice notice-${tone}`} role={tone === 'warning' ? 'alert' : 'status'}><Icon name={tone === 'warning' ? 'warning' : tone === 'success' ? 'check' : 'info'} size={17}/><div>{children}</div></div>; }
export function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  const id = useId();
  return <div className="field"><div className="field-heading"><label htmlFor={id} className="field-label">{label}</label>{hint && <Info label={`${label}说明`}>{hint}</Info>}</div>{React.isValidElement<{ id?: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }>(children) ? React.cloneElement(children, { id, ...(error ? { 'aria-invalid': true, 'aria-describedby': `${id}-error` } : {}) }) : children}{error && <small id={`${id}-error`} className="field-error">{error}</small>}</div>;
}
export function Toggle({ checked, onChange, label, disabled = false }: { checked: boolean; onChange: (value: boolean) => void; label: string; disabled?: boolean }) { return <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={disabled} onClick={() => onChange(!checked)} className={`toggle ${checked ? 'on' : ''}`}><span/></button>; }
export function Modal({ title, children, onClose, footer, wide = false, drawer = false }: { title: string; children: React.ReactNode; onClose: () => void; footer?: React.ReactNode; wide?: boolean; drawer?: boolean }) {
  const ref = useRef<HTMLDivElement>(null), id = useId();
  const closeRef = useRef(onClose); closeRef.current = onClose;
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      const firstInput = ref.current?.querySelector<HTMLElement>('.modal-content input:not([disabled]),.modal-content textarea:not([disabled]),.modal-content select:not([disabled])');
      (firstInput || ref.current?.querySelector<HTMLElement>('button:not([disabled])'))?.focus();
    }, 30);
    const handler = (e: KeyboardEvent) => {
      const dialogs = document.querySelectorAll('[role="dialog"]');
      if (dialogs[dialogs.length - 1] !== ref.current) return;
      if (e.key === 'Escape') { e.stopPropagation(); closeRef.current(); }
      if (e.key === 'Tab') {
        const nodes = Array.from(ref.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex="0"]') || []).filter(n => n.offsetParent !== null);
        const first = nodes[0], last = nodes.at(-1);
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => { clearTimeout(timer); document.removeEventListener('keydown', handler); document.body.style.overflow = overflow; if (prev?.isConnected) prev.focus(); };
  }, []);
  return <div className={`modal-backdrop ${drawer ? 'drawer-backdrop' : ''}`} onMouseDown={e => { if (e.currentTarget === e.target) onClose(); }}><div ref={ref} role="dialog" aria-modal="true" aria-labelledby={id} className={`modal ${wide ? 'modal-wide' : ''} ${drawer ? 'drawer' : ''}`}><header><h2 id={id}>{title}</h2><IconButton icon="close" label="关闭弹窗" onClick={onClose}/></header><div className="modal-content">{children}</div>{footer && <footer>{footer}</footer>}</div></div>;
}
export function Stat({ label, value, detail, icon, tone = '' }: { label: string; value: React.ReactNode; detail?: React.ReactNode; icon?: string; tone?: string }) { return <div className={`stat-card ${tone}`}><div className="stat-label">{label}{icon && <Icon name={icon} size={17}/>}</div><div className="stat-value">{value}</div>{detail && <div className="stat-detail">{detail}</div>}</div>; }
export function SearchBox({ value, onChange, placeholder = '搜索…', inputRef }: { value: string; onChange: (value: string) => void; placeholder?: string; inputRef?: React.Ref<HTMLInputElement> }) { return <div className="search-box"><Icon name="search" size={17}/><input ref={inputRef} aria-label={placeholder} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}/>{value && <button type="button" aria-label="清空搜索" onClick={() => onChange('')}><Icon name="close" size={14}/></button>}</div>; }
export function ProgressBar({ value, color = 'var(--accent)' }: { value: number; color?: string }) { return <div className="progress"><span style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }}/></div>; }
