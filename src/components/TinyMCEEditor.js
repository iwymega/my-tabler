import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const TinyMCEEditor = ({ value, onEditorChange }) => {
  useEffect(() => {
    

  }, []);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://az.gotrasoft.com/vendor/tinymce/tinymce.config.css"
        />
        <script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          async
        />
        <script
          src="https://az.gotrasoft.com/vendor/tinymce/jquery.tinymce.min.js"
          async
        />
        <script
          src="https://az.gotrasoft.com/vendor/tinymce/tinymce.min.js"
          async
        />
      </Helmet>
      <textarea className="editor-textarea" />
    </>
  );
};

export default TinyMCEEditor;