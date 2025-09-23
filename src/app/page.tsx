export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center bg-[#c5e4e7] p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-center text-[#5e7a7d] tracking-[0.6em] text-sm md:text-base mb-8 font-semibold">
          SPLI
          <br></br>
          TTER
        </h1>

        {/* Card */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_32px_43px_rgba(79,166,175,0.2)] grid gap-6 md:gap-8 md:grid-cols-2">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Bill */}
            <div className="flex flex-col gap-2">
              <label htmlFor="bill" className="text-[#5e7a7d] text-sm font-semibold">
                Bill
              </label>
              <input
                id="bill"
                type="number"
                placeholder="0"
                className="w-full bg-[#f3f9fa] text-[#00494d] text-2xl font-bold rounded-md px-4 py-3 text-right border-2 border-transparent focus:outline-none focus:border-[#26c0ab]"
              />
            </div>

            {/* Select Tip % */}
            <div className="flex flex-col gap-3">
              <span className="text-[#5e7a7d] text-sm font-semibold">Select Tip %</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button type="button" className="bg-[#00494d] text-white font-bold text-xl rounded-md py-2.5">5%</button>
                <button type="button" className="bg-[#00494d] text-white font-bold text-xl rounded-md py-2.5">10%</button>
                <button type="button" className="bg-[#00494d] text-white font-bold text-xl rounded-md py-2.5">15%</button>
                <button type="button" className="bg-[#00494d] text-white font-bold text-xl rounded-md py-2.5">25%</button>
                <button type="button" className="bg-[#00494d] text-white font-bold text-xl rounded-md py-2.5">50%</button>
                <input
                  type="number"
                  placeholder="Custom"
                  className="bg-[#f3f9fa] text-[#00494d] text-xl font-bold rounded-md px-4 py-2.5 text-center border-2 border-transparent focus:outline-none focus:border-[#26c0ab]"
                  aria-label="Custom tip"
                />
              </div>
            </div>

            {/* Number of People */}
            <div className="flex flex-col gap-2">
              <label htmlFor="people" className="text-[#5e7a7d] text-sm font-semibold">
                Number of People
              </label>
              <input
                id="people"
                type="number"
                placeholder="0"
                className="w-full bg-[#f3f9fa] text-[#00494d] text-2xl font-bold rounded-md px-4 py-3 text-right border-2 border-transparent focus:outline-none focus:border-[#26c0ab]"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="bg-[#00494d] rounded-xl p-6 md:p-8 flex flex-col gap-6 md:gap-8 justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-semibold">Tip Amount</span>
                  <span className="text-[#7f9c9f] text-xs font-semibold">/ person</span>
                </div>
                <div className="text-[#26c0ab] text-4xl md:text-5xl font-extrabold">$0.00</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-[#7f9c9f] text-xs font-semibold">/ person</span>
                </div>
                <div className="text-[#26c0ab] text-4xl md:text-5xl font-extrabold">$0.00</div>
              </div>
            </div>

            <button type="button" className="w-full bg-[#26c0ab] text-[#00494d] font-extrabold tracking-wider rounded-md py-3 disabled:opacity-50">
              RESET
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
