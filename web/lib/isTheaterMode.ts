export const isTheaterMode = (
  searchParams: ConstructorParameters<typeof URLSearchParams>[0]
) => {
  return new URLSearchParams(searchParams).get('theater') === '1'
}
