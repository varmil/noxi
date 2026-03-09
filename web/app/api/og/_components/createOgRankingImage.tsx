import { ImageResponse } from 'next/og'
import { ogFont } from './font'

const ROWS_PER_COLUMN = 20

function ColumnHeader({
  headerColor,
  children
}: {
  headerColor: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        background: headerColor,
        color: 'white',
        height: 40,
        fontSize: 15,
        gap: 8
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 44,
          justifyContent: 'flex-end',
          flexShrink: 0
        }}
      >
        順位
      </div>
      <div style={{ display: 'flex', width: 54, flexShrink: 0 }} />
      <div style={{ display: 'flex', flex: 1 }}>名前・グループ</div>
      {children}
    </div>
  )
}

export async function createOgRankingImage<T>({
  title,
  dateLabel,
  note,
  headerColor,
  width,
  height,
  items,
  headerRight,
  renderRow
}: {
  title: string
  dateLabel: string
  note: string
  headerColor: string
  width: number
  height: number
  items: T[]
  headerRight: React.ReactNode
  renderRow: (item: T, index: number) => React.ReactNode
}): Promise<ImageResponse> {
  const leftColumn = items.slice(0, ROWS_PER_COLUMN)
  const rightColumn = items.slice(ROWS_PER_COLUMN, ROWS_PER_COLUMN * 2)

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#f0f0f0',
        fontFamily: 'NotoSansJP'
      }}
    >
      {/* ヘッダー */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '16px 24px',
          gap: 32
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 'bold',
            color: '#1a202c',
            display: 'flex'
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#666',
            display: 'flex'
          }}
        >
          {dateLabel}
        </div>
      </div>

      {/* テーブル（2カラム） */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          padding: '0 20px',
          gap: 16
        }}
      >
        {/* 左カラム */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #e0e0e0'
          }}
        >
          <ColumnHeader headerColor={headerColor}>{headerRight}</ColumnHeader>
          {leftColumn.map((item, i) => renderRow(item, i))}
        </div>

        {/* 右カラム */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #e0e0e0'
          }}
        >
          <ColumnHeader headerColor={headerColor}>{headerRight}</ColumnHeader>
          {rightColumn.map((item, i) => renderRow(item, i))}
        </div>
      </div>

      {/* 注釈 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          padding: '8px 24px 14px',
          fontSize: 20,
          color: '#888'
        }}
      >
        {note}
      </div>
    </div>,
    {
      width,
      height,
      fonts: [
        {
          name: 'NotoSansJP',
          data: await ogFont,
          style: 'normal' as const
        }
      ]
    }
  )
}
