export function MadeByPublox() {
  return (
    <div className="flex flex-col items-center gap-2 pt-6 pb-2">
      <p className="text-xs text-white/60">Made by</p>
      <a
        href="https://www.publox-marketing.com/"
        target="_blank"
        rel="noreferrer"
        className="flex h-[40px] w-full max-w-[220px] items-center justify-center rounded-2xl border-t border-white/10 bg-white/15 px-4 backdrop-blur-xl text-xs font-medium text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-200 hover:bg-white/20 hover:-translate-y-[1px] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-0"
        aria-label="Visiter PUBLOX Marketing"
      >
        PUBLOX
      </a>
    </div>
  );
}

