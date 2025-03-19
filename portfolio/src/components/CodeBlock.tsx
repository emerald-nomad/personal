'use client';

import React, { useEffect } from "react";
import Prism from "prismjs";
// import loadLanguages from 'prismjs/components/index.js';
// loadLanguages(['rust']);

export function CodeBlock({ code, language }: {code: string; language: string}) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}