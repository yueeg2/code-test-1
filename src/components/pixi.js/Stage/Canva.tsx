import * as React from 'react';
import { Stage, Container } from '@pixi/react';
import { Bunny } from './Sprite';
import { DialogContext } from 'Contexts';

const height = 450;
const width = 600;

const OPTIONS = {
  backgroundColor: 0x1099bb,
  height: height,
  width: width
};

export default React.memo(function Canva() {
  const { setDialog } = React.useContext(DialogContext);
  return (

    <Stage options={OPTIONS}>
      <Container x={150} y={150}>
        {React.useMemo(() => <Bunny setDialog={setDialog} />, [])}
      </Container>
    </Stage>
  );
});