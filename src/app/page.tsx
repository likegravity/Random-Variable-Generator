"use client";
import { useState, useEffect } from "react";

interface Variable {
  id: number;
  name: string;
}

export default function Home() {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [selectedVariable, setSelectedVariable] = useState<string | null>(null);

  useEffect(() => {
    fetch('/variables.json')
      .then(response => response.json())
      .then(data => setVariables(data))
      .catch(error => console.error('Error loading variables:', error));
  }, []);

  const generateRandomVariable = () => {
    if (variables.length > 0) {
      const randomIndex = Math.floor(Math.random() * variables.length);
      setSelectedVariable(variables[randomIndex].name);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Random Variable Name Generator</h1>
      <button
        onClick={generateRandomVariable}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={variables.length === 0}
      >
        Generate
      </button>
      {selectedVariable && (
        <p className="mt-4 text-xl">generated name: {selectedVariable}</p>
      )}
    </div>
  );
}
