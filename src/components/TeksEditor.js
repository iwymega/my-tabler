import React, { useState, useEffect } from 'react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';

function TeksEditor({ value, onEditorChange }) {
  const [content, setContent] = useState(value);

    useEffect(() => {
        setContent(value);
    }, [value]);

    const handleEditorChange = (content, editor) => {
        setContent(content);
        onEditorChange(content);
    };

      // const handleChange = (event) => {
    //     // Extract the value from the event
    //     const newValue = event.target.getContent();
    //     // Call the onChange prop with the new value
    //     onChange({ target: { value: newValue } });
    //   };
    return (
      <TinyMCEEditor
          apiKey='p4iw8cwk73n4hcwocjr0zv7fx52xyafph1xii1324cu9pwyb'
          init={{
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          }}
          value={content}
          onEditorChange={handleEditorChange}
      />
  );
}

export default TeksEditor;