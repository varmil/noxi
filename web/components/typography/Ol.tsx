export default function Ol({ children }: React.PropsWithChildren<{}>) {
  return <ul className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ul>
}
