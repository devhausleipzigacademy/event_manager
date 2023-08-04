export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[url('https://source.unsplash.com/random/?event')] bg-cover bg-center w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
}
