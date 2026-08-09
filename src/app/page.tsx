import { ApplyFlowContainer } from "@/components/apply/apply-flow-container";

export default function HomePage() {
  return (
    <>
      <ApplyFlowContainer />
      <footer className="border-t border-accent-line/30 bg-white py-6">
        <div className="mx-auto max-w-[1440px] px-5 text-center text-sm text-text-grey tablet:px-[42px] desktop:px-16 desktop-xl:px-[88px]">
          &copy; {new Date().getFullYear()} AI Powered. All rights reserved.
        </div>
      </footer>
    </>
  );
}
