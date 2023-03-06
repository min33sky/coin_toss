import { useRef, useState } from 'react';
import headsImage from './assets/heads.svg';
import tailsImage from './assets/tails.svg';

export default function App() {
  const [{ heads, tails }, setScore] = useState({
    heads: 0,
    tails: 0,
  });
  const [disabled, setDisabled] = useState(false);
  const coinRef = useRef<HTMLDivElement>(null);

  const handleToss = () => {
    coinRef.current?.style.setProperty('animation', 'none');
    const result = Math.random() > 0.5 ? 'heads' : 'tails';

    if (result === 'heads') {
      setTimeout(() => {
        coinRef.current?.style.setProperty(
          'animation',
          'spin-heads 3s forwards',
        );
      }, 100);

      setTimeout(
        () => setScore((score) => ({ ...score, heads: score.heads + 1 })),
        3000,
      );
    } else {
      setTimeout(() => {
        coinRef.current?.style.setProperty(
          'animation',
          'spin-tails 3s forwards',
        );
      }, 100);

      setTimeout(
        () => setScore((score) => ({ ...score, tails: score.tails + 1 })),
        3000,
      );
    }

    disabeldButton();
  };

  const disabeldButton = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 3500);
  };

  const handleReset = () => {
    setScore({ heads: 0, tails: 0 });
  };

  return (
    <div className="grid h-screen place-items-center bg-purple-100 text-purple-200">
      {/* App */}
      <section className="perspective w-11/12 max-w-md rounded-md bg-white px-6 py-10 shadow-xl">
        <header className="ml-auto flex w-3/12 justify-end gap-4 border-b border-b-purple-600 px-1 py-2 font-semibold text-purple-700">
          <p>앞 : {heads} </p>
          <p>뒤 : {tails} </p>
        </header>

        <div
          ref={coinRef}
          className="preserve-3d relative mx-auto my-14 h-[150px] w-[150px]"
        >
          <div className="backface-hidden absolute ">
            <img src={headsImage} className="w-[145px]" alt="앞면" />
          </div>
          <div className="backface-hidden rotate-x-180 absolute">
            <img src={tailsImage} className="w-[145px]" alt="뒷면" />
          </div>
        </div>

        <footer className="flex justify-between">
          <button
            className="rounded-md bg-purple-800 px-4 py-2 transition hover:bg-purple-900 disabled:cursor-not-allowed disabled:bg-purple-400"
            onClick={handleToss}
            disabled={disabled}
          >
            던지기
          </button>
          <button
            className="rounded-md bg-purple-300 py-2 px-4 text-purple-900 transition hover:bg-purple-200"
            onClick={handleReset}
          >
            리셋
          </button>
        </footer>
      </section>
    </div>
  );
}
