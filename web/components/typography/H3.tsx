export default function H3({ children }: React.PropsWithChildren<{}>) {
  return (
    <h3 className="my-4 scroll-m-20 text-xl sm:text-2xl font-semibold">
      {children}
    </h3>
  )
}
