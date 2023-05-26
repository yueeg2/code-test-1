import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';
import Dragable from '../drag/Drag';
import Resize from '../resize/Resize';
import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import ReactPIXI from "react-pixi-fiber";
import RotatingBunny from './RotatingBunny';
import DragableBunny from './DragableBunny';

const STATIC_PATH = '/my-img';

const height = 450;
const width = 600;
const OPTIONS = {
  backgroundColor: 0x1099bb,
  height: height,
  width: width
};

export default function Canva() {
  

  return (
    <Stage options={OPTIONS}>
      <DragableBunny />
      {/* <RotatingBunny x={width / 2} y={height / 2} /> */}
    </Stage>
  );
};