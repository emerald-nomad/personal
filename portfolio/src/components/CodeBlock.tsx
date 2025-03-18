'use client';

import React, { useEffect } from "react";
import Prism from "prismjs";
const loadLanguages = require('prismjs/components/');
loadLanguages(['rust']);


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