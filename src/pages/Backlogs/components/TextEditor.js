import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box } from "@mui/material";



export default function TextEditor({value}) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log({editorState: editorState.getCurrentContent()});
  }, [editorState]);
  return (
    <Box>
      <Box sx={{ border: "1px solid black", padding: '2px', minHeight: '250px', maxHeight: '250px' }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        //   wrapperClassName={}
        //   editorClassName="editor-class"
        //   toolbarClassName="toolbar-class"
        />
      </Box>
    </Box>
  );
}