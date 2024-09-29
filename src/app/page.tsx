import Chart from "./chart";

const dates = Array.from({ length: 12 }, (_, i) => new Date(2021, i, 1));

const mockData = Array.from({ length: 12 }, (_, i) => ({
  timestamp: dates[i % dates.length].getTime(),
  amount: 500 + Math.random() * 500,
}));

function Home() {
  return (
    <main>
      <section>
        <header className="p-4">
          <h1 className="text-sm font-medium text-neutral-500">Expenses</h1>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-neutral-900">$0.00</h2>
            <h3 className="rounded-full bg-green-600 px-2 py-0.5 text-sm font-medium text-white">5.00%</h3>
          </div>
        </header>
        <div className="aspect-video w-full rounded-t-2xl px-4">
          <Chart data={mockData} />
        </div>
      </section>
    </main>
  );
}

export default Home;
