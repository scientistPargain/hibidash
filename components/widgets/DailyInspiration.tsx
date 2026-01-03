"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Sparkles } from "lucide-react";

const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "Everything you've ever wanted is on the other side of fear. - George Addair",
  "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine. - Roy T. Bennett",
];

const facts = [
  "Did you know? Honey never spoils. Archaeologists have found 3000-year-old honey in Egyptian tombs that's still edible!",
  "Fun fact: Octopuses have three hearts and blue blood!",
  "Amazing: Your brain can generate enough electricity to power a small light bulb!",
  "Interesting: A group of flamingos is called a 'flamboyance'!",
  "Cool fact: The shortest war in history lasted only 38 minutes!",
  "Did you know? Bananas are berries, but strawberries aren't!",
];

export default function DailyInspiration() {
  const [content, setContent] = useState("");
  const [type, setType] = useState<"quote" | "fact">("quote");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    refresh();
  }, []);

  const refresh = () => {
    const isQuote = Math.random() > 0.5;
    setType(isQuote ? "quote" : "fact");

    if (isQuote) {
      setContent(quotes[Math.floor(Math.random() * quotes.length)]);
    } else {
      setContent(facts[Math.floor(Math.random() * facts.length)]);
    }
  };

  if (!mounted) {
    return (
      <div className="h-full">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent font-bold">
            Daily Inspiration
          </h2>
          <button className="rounded-full bg-yellow-500 p-2 text-white transition hover:bg-yellow-600">
            <RefreshCw size={20} />
          </button>
        </div>

        <div className="relative rounded-lg bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6">
          <Sparkles
            className="absolute right-4 top-4 text-yellow-500"
            size={24}
          />
          <div className="space-y-2">
            <span className="inline-block rounded-full bg-white dark:bg-gray-800 px-3 py-1 text-xs font-semibold">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent font-bold">
          Daily Inspiration
        </h2>
        <button
          onClick={refresh}
          className="rounded-full bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="relative rounded-lg bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
        <Sparkles
          className="absolute right-4 top-4 text-yellow-500"
          size={24}
        />
        <div className="space-y-2">
          <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold">
            {type === "quote" ? "💭 Quote" : "🌟 Fun Fact"}
          </span>
          <p className="text-gray-800 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}
