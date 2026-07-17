export default function ImpressumPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary, #0a0a0a)',
        color: 'rgba(240,237,232,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
      }}
    >
      <div style={{ maxWidth: '560px', width: '100%' }}>
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'rgba(240,237,232,0.2)',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          Impressum
        </p>

        <h1
          style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            fontWeight: 200,
            letterSpacing: '-0.02em',
            color: 'rgba(240,237,232,0.9)',
            marginBottom: '40px',
            lineHeight: 1.1,
          }}
        >
          Angaben gemäß § 5 TMG
        </h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            fontSize: '14px',
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          <div>
            <p style={{ color: 'rgba(240,237,232,0.35)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>Verantwortlich</p>
            <p>Jascha Kruse</p>
            {/* Adresse eintragen */}
            <p style={{ color: 'rgba(240,237,232,0.35)' }}>[Dorotheenstr. 41]</p>
            <p style={{ color: 'rgba(240,237,232,0.35)' }}>[24939 Flensburg]</p>
          </div>

          <div>
            <p style={{ color: 'rgba(240,237,232,0.35)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>Kontakt</p>
            <p>
              <a
                href="mailto:jascha.kruse@web.de"
                style={{ color: 'rgba(200,184,154,0.7)', textDecoration: 'none' }}
              >
                jascha.kruse@web.de
              </a>
            </p>
          </div>

          <div>
            <p style={{ color: 'rgba(240,237,232,0.35)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>Haftungsausschluss</p>
            <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '13px' }}>
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(240,237,232,0.06)', paddingTop: '32px', marginTop: '8px' }}>
            <p style={{ color: 'rgba(240,237,232,0.35)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>Datenschutzerklärung</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '13px', color: 'rgba(240,237,232,0.4)', lineHeight: 1.8 }}>
              <div>
                <p style={{ color: 'rgba(240,237,232,0.55)', fontWeight: 400, marginBottom: '4px' }}>Verantwortlicher</p>
                <p>Jascha Kruse, Dorotheenstr. 41, 24939 Flensburg</p>
              </div>

              <div>
                <p style={{ color: 'rgba(240,237,232,0.55)', fontWeight: 400, marginBottom: '4px' }}>Hosting & Datenverarbeitung</p>
                <p>
                  Diese Website wird über <strong style={{ color: 'rgba(240,237,232,0.5)', fontWeight: 400 }}>Cloudflare Pages</strong> (Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA) bereitgestellt.
                  Beim Abruf der Seite verarbeitet Cloudflare automatisch technische Zugriffsdaten wie IP-Adresse, Browsertyp, Betriebssystem sowie Datum und Uhrzeit des Zugriffs.
                  Diese Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren und stabilen Betrieb der Website).
                  Cloudflare ist unter dem EU-U.S. Data Privacy Framework zertifiziert. Weitere Informationen:{' '}
                  <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(200,184,154,0.6)', textDecoration: 'none' }}>
                    cloudflare.com/privacypolicy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '56px' }}>
          <a
            href="/"
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(240,237,232,0.25)',
              textDecoration: 'none',
            }}
          >
            ← Zurück
          </a>
        </div>
      </div>
    </div>
  );
}
