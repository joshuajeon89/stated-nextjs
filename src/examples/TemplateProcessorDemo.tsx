"use client";

import React, { useEffect, useState } from "react";
import TemplateProcessor from "stated-js";

interface Template {
  a: string;
  b: string | ((e: any) => Promise<void>);
}

interface TemplateProcessorType {
  template: Template;
  output: Template;
  initialize: () => Promise<void>;
}

const TemplateProcessorDemo = () => {
  const [message, setMessage] = useState<string>("");
  const [templateProcessor, setTemplateProcessor] =
    useState<TemplateProcessorType | null>(null);

  useEffect(() => {
    const template: Template = {
      a: "--",
      b: "${function($e){$set('/a', $e)}}",
    };

    const tp = new TemplateProcessor(template) as TemplateProcessorType;
    tp.initialize().then(() => {
      setTemplateProcessor(tp);
      setMessage(tp.output.a);
    });
  }, []);

  const handleClick = async () => {
    if (templateProcessor && templateProcessor.output.b instanceof Function) {
      await templateProcessor.output.b("Clicked! @ " + Math.random());
      setMessage(templateProcessor.output.a);
    }
  };

  return (
    <div className="App text-white-900">
      <p>{message}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default TemplateProcessorDemo;
