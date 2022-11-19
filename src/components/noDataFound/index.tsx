const DataNotFound = () => {
  return (
    <div>
      <img src="images/not-found.svg" alt="data not found" />
      <div
        style={{
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '24px',
          fontFamily: 'Jakarta_Text_Light',
          paddingTop: '2%'
        }}
      >
        No results found
      </div>
      <div
        style={{
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '24px',
          fontFamily: 'Jakarta_Text_Light',
          paddingTop: '1%'
        }}
      >
        Please try searching with another term
      </div>
    </div>
  );
};
export default DataNotFound;
