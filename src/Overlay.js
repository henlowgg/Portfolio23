export function Overlay() {
    return (
      <>
      {/* <div style={{ position: 'absolute', top: 80, left: 80, fontSize: '20px', textAlign: 'right', lineHeight: '1.5em'}}>
        navbar

      </div> */}
        <div style={{ position: 'absolute', top: 80, right: 150, fontSize: '20px', textAlign: 'right', lineHeight: '1.5em' }}>
          Jack Ault
        </div>
        <div
          style={{
            position: 'absolute',
            top: 80,
            right: 80,
            fontSize: '18px',
            textAlign: 'right',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: '1.5em'
          }}>
          —
          <br />
          Software Engineer
        </div>
      </>
    )
  }