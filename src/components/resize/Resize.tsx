import { Resizable } from 're-resizable';

export default function Resize({ children }: any) {
  return (<Resizable
    defaultSize={{
      width: 320,
      height: 200,
    }}
  >
    {children}
  </Resizable>)
}