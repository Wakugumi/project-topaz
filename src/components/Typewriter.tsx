import React, { useState, useEffect } from 'react';
import './Typewriter.css'; // Add custom styles for alignment

interface TypewriterProps {
  texts: string[]; // Array of texts to cycle through
  typingSpeed?: number; // Speed of typing (ms per character)
  delayBetweenTexts?: number; // Delay before switching to next text
}

const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  typingSpeed = 50,
  delayBetweenTexts = 2000,
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      // Simulate deleting the text from the right
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }, typingSpeed);
    } else {
      // Simulate typing the text from the right
      timeout = setTimeout(() => {
        setCurrentText((prev) => currentFullText.slice(-prev.length - 1));
        if (currentText === currentFullText) {
          timeout = setTimeout(() => setIsDeleting(true), delayBetweenTexts);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timeout); // Cleanup the timeout
  }, [currentText, currentIndex, isDeleting, texts, typingSpeed, delayBetweenTexts]);

  return (
    <span className="typewriter-text">{currentText}</span>
  );
};

export default Typewriter;

