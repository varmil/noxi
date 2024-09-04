export default function Ul({ children }: React.PropsWithChildren<{}>) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
}
