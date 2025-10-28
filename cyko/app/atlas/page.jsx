import AtlasSampleList from "@/app/components/AtlasSampleList";

export const metadata = {
  title: "MongoDB Atlas Sample Data",
  description: "Preview documents from the MongoDB Atlas sample dataset.",
};

export default function AtlasSamplePage() {
  return (
    <section className="space-y-6 p-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">
          MongoDB Atlas Sample Data
        </h1>
        <p className="max-w-2xl text-slate-600">
          Below is a quick look at the movies collection that comes with the
          Atlas sample datasets. The data is fetched in real time from your
          cluster.
        </p>
      </header>
      <AtlasSampleList />
    </section>
  );
}
