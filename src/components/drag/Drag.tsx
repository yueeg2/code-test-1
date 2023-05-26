import Draggable from "react-draggable";


export default function Dragable({children}: any) {
  console.log(children)
  return (
    <Draggable>
      {children}
    </Draggable>
  )
    
}