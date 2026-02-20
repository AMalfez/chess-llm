interface MoveHistoryProps {
  moves: string[];
}

export default function MoveHistory({ moves }: MoveHistoryProps) {
  const formatMoveHistory = () => {
    const pairs = [];
    for (let i = 0; i < moves.length; i += 2) {
      pairs.push({
        number: Math.floor(i / 2) + 1,
        white: moves[i],
        black: moves[i + 1] || ''
      });
    }
    return pairs;
  };

  const movePairs = formatMoveHistory();

  return (
    <div className="move-history">
      <h3>Move History</h3>
      <div className="moves-list">
        {movePairs.length === 0 ? (
          <p className="no-moves">No moves yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>White</th>
                <th>Black</th>
              </tr>
            </thead>
            <tbody>
              {movePairs.map((pair) => (
                <tr key={pair.number}>
                  <td>{pair.number}</td>
                  <td>{pair.white}</td>
                  <td>{pair.black}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
