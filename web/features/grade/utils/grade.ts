import { GradeString } from 'features/grade/types/grade'

/**
 * グレードの計算関数
 */
export const calculateGrade = (
  percentage?: number
): GradeString | undefined => {
  if (percentage === undefined) return 'E'
  if (percentage <= 0.1) return 'SS+'
  if (percentage <= 1) return 'SS'
  if (percentage <= 5) return 'S+'
  if (percentage <= 10) return 'S'
  if (percentage <= 25) return 'A'
  if (percentage <= 50) return 'B'
  return 'C'
}

/**
 * グレードの色を決定する関数
 */
export const getGradeColor = (grade?: GradeString): string => {
  switch (grade) {
    case 'SS+':
      return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
    case 'SS':
      return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
    case 'S+':
      return 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
    case 'S':
      return 'bg-blue-600 text-white'
    case 'A':
      return 'bg-green-700 text-white'
    case 'B':
      return 'bg-yellow-700 text-white'
    case 'C':
      return 'bg-gray-600 text-white'
    default:
      return 'bg-gray-600 text-white'
  }
}
