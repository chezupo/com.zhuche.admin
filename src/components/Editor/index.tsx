import React, {useEffect, useState} from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {FileLoader} from '@ckeditor/ckeditor5-upload/src/filerepository'
import MyUploadAdapter from '@/components/Editor/MyUploadAdapter'

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader: FileLoader) => {
    return new MyUploadAdapter(loader)
  }
}

type TextEditorPropsType = {
  value?: string
  onChange?: (value: string) => void
}

let  mounted = false
const TextEditor: React.FC<TextEditorPropsType>  = (props) => {
  const value = props.value || ''

    const custom_config = {
      extraPlugins: [ MyCustomUploadAdapterPlugin ],
      table: {
        contentToolbar: [
          'tableColumn', 'tableRow', 'mergeTableCells'
        ]
      },
    }
    const [editorInstance, setEditorInstance] = useState<any>(null)
  const init = () => {
    mounted && value.length === 0 && editorInstance !== null && editorInstance.getData().length > 0 && editorInstance.setData('')
  }

  useEffect(() => {
    mounted = true
    init()
    return () => {
      mounted = false
    }
  }, [])
  useEffect(() => {
    mounted = true
    init()
    return () => {
      mounted = false
    }
  }, [props.value])

    return(
      <CKEditor
        required
        editor={ClassicEditor}
        config={custom_config}
        data={value}
        onReady={editor => {
          setEditorInstance(editor)
        } }
        onChange={ ( event, editor ) => {
          const data = editor.getData();
          props.onChange && props.onChange(data)
        } }
      />
    )
}


export default TextEditor
