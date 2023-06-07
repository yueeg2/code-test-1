
import * as React from 'react';
import './App.css';
import './index.css'
import Canva from './components/pixi.js/Stage/Canva';
import AlertDialog from './components/Dialog';
import { DialogContext } from './Contexts';

function App() {


  const [dialog, setDialog] = React.useState<any>({ open: false, dragTargetName: null, currentUserId: '2' });
  const [altKey, setAltKey] = React.useState(false);

  const uhandler = (e: KeyboardEvent) => {
    if (e.key === 'Alt') {
      setAltKey(false)
    }
  };

  const dhandler = (e: KeyboardEvent) => {
    if (e.altKey) {
      setAltKey(true)
    }
  };
  const puhandler = (e: PointerEvent) => {
    !e.altKey && setAltKey(false)
  };

  const pdhandler = (e: PointerEvent) => {
    !e.altKey && setAltKey(false)
  };

  React.useEffect(() => {

    document.addEventListener('keydown', dhandler);
    document.addEventListener('pointerdown', pdhandler);
    document.addEventListener('pointerup', puhandler);
    document.addEventListener('keyup', uhandler);
    return () => {
      document.removeEventListener('keydown', dhandler);
      document.addEventListener('pointerdown', pdhandler);
      document.addEventListener('pointerup', puhandler);
      document.removeEventListener('keyup', uhandler);
    };
  }, []);


  return (
    <div className="App">
      <DialogContext.Provider value={{ dialog, setDialog }}>
        <header className="App-header">
          <section>
            <div className="canva">
              <Canva />
              {React.useMemo(() => <span>altKey: {altKey ? 'True' : 'False'}</span>, [altKey])}
            </div>
            <h3>"Comments"</h3>
            <p><span style={{ textDecoration: 'underline' }}>alt+ClickHold</span> to pad around bunny</p>
          </section>
        </header>
        <AlertDialog dialog={dialog} setDialog={setDialog} />

      </DialogContext.Provider>
    </div>
  );
}

export default App;
