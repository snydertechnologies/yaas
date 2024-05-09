interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: BlogLayoutProps) {
  return (
    <div
      className={'space-y-8 pb-8 pt-4 md:py-16 mx-auto w-full max-w-[750px]'}
    >
      {children}
    </div>
  );
}
