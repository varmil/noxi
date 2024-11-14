import { ImageResponse } from 'next/og'
import { getSupersBundles } from 'apis/youtube/getSupersBundles'
import dayjs from 'lib//dayjs'
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  const supersBudles = await getSupersBundles({
    actualEndTimeGTE: dayjs().subtract(1, 'day').toDate(),
    orderBy: [{ field: 'amountMicros', order: 'desc' }],
    limit: 5
  })
  console.log(supersBudles)

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        👋 Hello
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
