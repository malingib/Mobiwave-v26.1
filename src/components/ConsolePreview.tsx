const kpis = [
  { label: 'Collected', value: 'KES 128,400', delta: '+12.4%' },
  { label: 'Delivered', value: '24,918', delta: '+8.1%' },
  { label: 'Success rate', value: '98.6%', delta: '+1.2pp' },
]

const rows = [
  { name: 'Wanjiku Kamau', meta: 'STK · 07••••42', amount: 'KES 2,400', status: 'Confirmed' },
  { name: 'Acme Logistics', meta: 'Bulk SMS · campaign', amount: '12,400 sent', status: 'Delivered' },
  { name: 'Brian Otieno', meta: 'STK · 07••••18', amount: 'KES 850', status: 'Pending' },
]

export function ConsolePreview() {
  return (
    <div className="lp-console" aria-label="Preview of the MobiWave payments and messaging console">
      <div className="lp-console-top">
        <span className="lp-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="lp-url">app.mobiwave.co.ke</span>
        <span className="lp-live"><i aria-hidden="true" />Live</span>
      </div>

      <div className="lp-console-body">
        <aside className="lp-rail" aria-hidden="true">
          <span className="lp-rail-logo">M</span>
          <span className="lp-rail-item active" />
          <span className="lp-rail-item" />
          <span className="lp-rail-item" />
          <span className="lp-rail-item" />
          <span className="lp-rail-user">MW</span>
        </aside>

        <div className="lp-main">
          <div className="lp-bar">
            <div>
              <span className="lp-crumb">Overview</span>
              <strong>Payment operations</strong>
            </div>
            <span className="lp-env">Sandbox</span>
          </div>

          <div className="lp-kpis">
            {kpis.map((kpi) => (
              <div className="lp-kpi" key={kpi.label}>
                <span>{kpi.label}</span>
                <strong>{kpi.value}</strong>
                <small>{kpi.delta} vs last week</small>
              </div>
            ))}
          </div>

          <div className="lp-chart">
            <div className="lp-chart-head">
              <span>Successful collections</span>
              <span className="lp-chart-tabs"><b>7d</b><i>30d</i><i>90d</i></span>
            </div>
            <svg viewBox="0 0 320 84" role="img" aria-label="Collections trend rising across seven days">
              <defs>
                <linearGradient id="lpFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5955d1" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#5955d1" stopOpacity="0.01" />
                </linearGradient>
              </defs>
              {[18, 40, 62].map((y) => <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#eef0f6" />)}
              <path d="M0 66 L45 58 L90 62 L135 44 L180 48 L225 30 L270 34 L320 18 L320 84 L0 84 Z" fill="url(#lpFill)" />
              <path d="M0 66 L45 58 L90 62 L135 44 L180 48 L225 30 L270 34 L320 18" fill="none" stroke="#5955d1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="320" cy="18" r="4" fill="#5955d1" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>

          <div className="lp-rows">
            {rows.map((row) => (
              <div className="lp-row" key={row.name}>
                <span className="lp-avatar" aria-hidden="true">{row.name.slice(0, 1)}</span>
                <span className="lp-row-copy">
                  <strong>{row.name}</strong>
                  <small>{row.meta}</small>
                </span>
                <span className="lp-row-amount">{row.amount}</span>
                <span className={`lp-status ${row.status.toLowerCase()}`}>{row.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lp-float lp-float-a">
        <span className="lp-float-icon success" aria-hidden="true">✓</span>
        <div><strong>M-Pesa confirmed</strong><small>KES 2,400 · Ref 4821</small></div>
      </div>
      <div className="lp-float lp-float-b">
        <span className="lp-float-icon" aria-hidden="true">↗</span>
        <div><strong>99.9% delivery</strong><small>Across Kenyan networks</small></div>
      </div>
    </div>
  )
}
