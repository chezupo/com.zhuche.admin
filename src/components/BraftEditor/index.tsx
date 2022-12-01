import React, {useEffect, useState} from "react";
import BraftEditor, {EditorState} from 'braft-editor';
import 'braft-editor/dist/index.css';

type BraftEditorPropsType = {
  value?: string
  onChange?: (newValue: string) => void
  className?: string
  style?: React.CSSProperties
}
const CustomerEditor: React.FC<BraftEditorPropsType> = props => {
  const [data, setData] = useState<EditorState>(BraftEditor.createEditorState(null))
  const handleChange = (editorState: EditorState) => {
    const htmlContent = editorState.toHTML()
    if (props.onChange) {
      props.onChange(htmlContent)
    }
    setData(editorState)
  }
  const handleInit = () => {
    if (props?.value !== undefined) {
      if (BraftEditor.createEditorState(props.value).toHTML() != data.toHTML()) {
        setData(BraftEditor.createEditorState(props.value))
      }
    }
  }
  useEffect(() => handleInit(), [])
  useEffect(() => handleInit(), [props.value])

  return (
    <>
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <BraftEditor
          style={props.style || {}}
          className={props.className || ''}
          value={data}
          onChange={handleChange}
        />
      }
    </>

  )
}

export default CustomerEditor
