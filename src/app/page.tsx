'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [emojiArray, setEmojiArray] = useState([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const emojis = ['😀', '🔥', '🎉', '🚀', '💀', '👾', '🐉', '⚡', '💫', '🌀', '🦄'];
      const newEmoji = {
        id: Math.random(),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: event.clientX,
        y: event.clientY,
        speedY: Math.random() * 2 + 0.5,
        opacity: 1,
      };

      setEmojiArray((prev) => [...prev, newEmoji]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmojiArray((prev) =>
        prev
          .map((e) => ({ ...e, y: e.y + e.speedY, opacity: e.opacity - 0.05 }))
          .filter((e) => e.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">
      {emojiArray.map((emoji) => (
        <span
          key={emoji.id}
          className="absolute text-4xl transition-transform duration-75"
          style={{
            left: `${emoji.x}px`,
            top: `${emoji.y}px`,
            opacity: emoji.opacity,
            transform: `translate(-50%, -50%)`,
          }}
        >
          {emoji.emoji}
        </span>
      ))}
    </div>
  );
}
