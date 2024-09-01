import { useCallback, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TextEditor({ setContent, content }) {
  const editorRef = useRef(null);
  const log = useCallback(() => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  }, [setContent]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(content); // Update editor content when content prop changesonChange={log},
    }
  }, [content]);
  return (
    <Editor
     
      apiKey="thbkcrs7uawrriuqjwkwcve8q34o4ki5ku6fby4c28ze2xqt"
      onBlur={log}
      onInit={(_evt, editor) => (editorRef.current = editor)}
      initialValue="<p>Write something about Astronomy</p>"
      init={{
        width: 746,
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",

          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        // paste_as_text: true,
        // paste_preprocess: (plugin, args) => {
        //   // Ensure pasted content adheres to editor's styling
        //   args.content = args.content.replace(/(?:\r\n|\r|\n)/g, "<br>"); // Normalize new lines
        // },
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px;  }",
        paste_as_text: true,
    

        statusbar: false,
      }}
    />
  );
}
