import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";

export default function TextEditor({ setContent, content }) {
  const isDark = useSelector((state) => state.darkMode.isDarkMode);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(content); // Update editor content when content prop changes
    }
  }, [content]);
  return (
    <div className="">
      <Editor
        apiKey="thbkcrs7uawrriuqjwkwcve8q34o4ki5ku6fby4c28ze2xqt"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onChange={log}
        init={{
          height: 470,
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
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color:black; color:#E0E0E0; }",
          statusbar: false,
          skin:  "DARK" ,
          skin_url: "/skins/ui/DARK" ,
          // content_css: "/skins/content/DARK/content.min.css",
          width: 746,
        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </div>
  );
}
