"use client";

export default function BackToTop() {
  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="
        fixed
        bottom-8
        right-8
        text-zinc-500
        hover:text-white
      "
    >
      ↑ Top
    </button>
  );
}