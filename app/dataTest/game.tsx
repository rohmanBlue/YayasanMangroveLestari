"use client";
import React, { useState, useCallback } from "react";

type Fighter = {
  id: number;
  name: string;
  role: "PLAYER" | "ENEMY";
  health: number;
  question?: string;
  correctAnswer?: number;
  defeated?: boolean;
};

const Game: React.FC = () => {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(1);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [playerName, setPlayerName] = useState("Hero");
  const [enemyCustomNames, setEnemyCustomNames] = useState<string[]>([]);

  // 🔹 Buat battle (pakai useCallback biar stabil)
  const generateBattle = useCallback(() => {
    const player: Fighter = {
      id: 0,
      name: playerName || "Hero",
      role: "PLAYER",
      health: 3,
    };

    const enemies: Fighter[] = Array.from({ length: 5 }).map((_, i) => {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const customName = enemyCustomNames[i] || `Musuh #${i + 1}`;
      return {
        id: i + 1,
        name: customName,
        role: "ENEMY",
        health: 1,
        question: `${a} × ${b}`,
        correctAnswer: a * b,
        defeated: false,
      };
    });

    setFighters([player, ...enemies]);
    setCurrentEnemyIndex(1);
    setMessage("");
  }, [playerName, enemyCustomNames]);

  const player = fighters.find((f) => f.role === "PLAYER");
  const enemies = fighters.filter((f) => f.role === "ENEMY");
  const currentEnemy = enemies[currentEnemyIndex - 1];

  const handleAnswer = () => {
    if (!player || !currentEnemy) return;

    if (parseInt(answer) === currentEnemy.correctAnswer) {
      const updated = fighters.map((f) =>
        f.id === currentEnemy.id ? { ...f, defeated: true, health: 0 } : f
      );
      setFighters(updated);
      setMessage(`🎯 ${currentEnemy.name} dikalahkan!`);
      const nextEnemy = enemies.find((e, i) => i > currentEnemyIndex - 1 && !e.defeated);
      setCurrentEnemyIndex(nextEnemy ? nextEnemy.id : 0);
    } else {
      const updated = fighters.map((f) =>
        f.role === "PLAYER" ? { ...f, health: f.health - 1 } : f
      );
      setFighters(updated);
      setMessage(`❌ Salah! ${player.name} kehilangan 1 nyawa!`);
    }

    setAnswer("");
  };

  const restartGame = () => {
    generateBattle();
  };

  // 🔻 Input nama sebelum mulai
  if (fighters.length === 0) {
    return (
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-3xl font-bold mb-4">⚔️ Setup Math Battle ⚔️</h1>

        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Nama pemain..."
          className="border px-3 py-2 rounded mb-2"
        />

        {Array.from({ length: 5 }).map((_, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Nama musuh #${i + 1} (opsional)`}
            onChange={(e) => {
              const newNames = [...enemyCustomNames];
              newNames[i] = e.target.value;
              setEnemyCustomNames(newNames);
            }}
            className="border px-3 py-2 rounded mb-2"
          />
        ))}

        <button
          onClick={generateBattle}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Mulai Game
        </button>
      </div>
    );
  }

  // 🔻 Jika player kalah
  if (player && player.health <= 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-red-600">💀 Game Over!</h1>
        <p className="mt-2 text-lg">Kamu dikalahkan oleh musuh.</p>
        <button
          onClick={restartGame}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Main Lagi
        </button>
      </div>
    );
  }

  // 🔻 Jika semua musuh sudah kalah
  if (enemies.length > 0 && enemies.every((e) => e.defeated)) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-green-600">🏆 Kamu Menang!</h1>
        <p className="mt-2">Semua musuh sudah dikalahkan!</p>
        <button
          onClick={restartGame}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Main Lagi
        </button>
      </div>
    );
  }

  if (!player || !currentEnemy) {
    return <p className="text-center mt-10">Memuat musuh...</p>;
  }

  // 🔻 Tampilan utama battle
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold mb-4">⚔️ Math Battle ⚔️</h1>

      <div className="bg-gray-100 p-4 rounded shadow w-80 text-center">
        <p className="text-xl font-semibold mb-1">
          {player.name} ❤️ {player.health}
        </p>
        <hr className="my-2" />
        <p className="text-lg font-semibold mb-2">{currentEnemy.name}</p>
        <p className="text-xl mb-3">{currentEnemy.question}</p>

        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Jawabanmu..."
          className="border rounded px-3 py-2 mr-2"
        />
        <button
          onClick={handleAnswer}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Jawab
        </button>
        <p className="mt-3 text-sm text-gray-700">{message}</p>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Musuh tersisa: {enemies.filter((e) => !e.defeated).length}
      </div>
    </div>
  );
};

export default Game;
