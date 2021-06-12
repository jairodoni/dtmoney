import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';

export function SkeletonForTable() {
  const { title } = useContext(ThemeContext)
  const colors = title === "dark" ? "#272E45" : "#D9DBDE"

  let arrayForSkeleton = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]

  return (
    <tbody>
      {arrayForSkeleton.map(item => (
        <tr>
          <td>
            <Skeleton
              key={item.id}
              height={90}
              style={{
                background: colors,
                borderRadius: "8px 0 0 8px",
              }}
            />
          </td>
          <td>
            <Skeleton
              key={item.id}
              height={90}
              style={{
                background: colors,
              }}
            />
          </td>
          <td>
            <Skeleton
              key={item.id}
              height={90}
              style={{
                background: colors,
              }}
            />
          </td>
          <td>
            <Skeleton
              key={item.id}
              height={90}
              style={{
                background: colors,
              }}
            />
          </td>
          <td>
            <Skeleton
              key={item.id}
              height={90}
              style={{
                background: colors,
              }}
            />
          </td>
          <td>
            <Skeleton
              key={item.id}
              height={90}
              style={{
                background: colors,
                borderRadius: "0 8px 8px 0",
              }}
            />
          </td>
        </tr>
      ))}
    </tbody>
  )
}