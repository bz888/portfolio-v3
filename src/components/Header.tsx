type HeaderProp = {
  text: string;
  navigate: () => Promise<void> | void;
  onBack: () => Promise<void> | void;
  isHome: boolean
};

export default function Header({ text, navigate, onBack, isHome }: HeaderProp) {
  return (
    <div className="z-20 flex flex-row gap-6 w-fit h-fit">
      { !isHome && (
        <span
          onClick={onBack}
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold cursor-pointer hover:text-gray-500"
        >
          {"<"}
        </span>
      )}

      <span
        onClick={navigate}
        className={`text-6xl sm:text-7xl md:text-8xl font-extrabold cursor-pointer`}
      >
        {text}
      </span>
    </div>
  );
}
