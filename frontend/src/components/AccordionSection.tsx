import { useState } from "react";

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  iconSrc: string;
}

export default function AccordionSection({
  title,
  children,
  iconSrc,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <section
      id="HomeServices"
      className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{title}</h2>
        <button type="button" onClick={toggleOpen}>
          <img
            src={iconSrc}
            alt="icon"
            className={`h-[32px] w-[32px] shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {isOpen && <div className="flex flex-col gap-4">{children}</div>}
    </section>
  );
}
