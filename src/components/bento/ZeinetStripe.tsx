export function ZeinetStripe({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute top-0 left-0 w-10 sm:w-14 h-full pointer-events-none ${className}`}
      style={{ background: 'linear-gradient(180deg, rgba(124,58,237,0.4) 0%, rgba(29,140,137,0.25) 55%, transparent 100%)' }}
      aria-hidden
    />
  );
}
