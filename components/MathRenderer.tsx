import React, { useEffect, useRef } from 'react';

interface MathRendererProps {
  content: string;
  className?: string;
}

const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && (window as any).MathJax) {
      // Clear previous content and set new content
      containerRef.current.innerHTML = content;
      // Tell MathJax to typeset the new content
      (window as any).MathJax.typesetPromise([containerRef.current])
        .catch((err: any) => console.error('MathJax error:', err));
    }
  }, [content]);

  return <div ref={containerRef} className={`math-content ${className}`} />;
};

export default MathRenderer;