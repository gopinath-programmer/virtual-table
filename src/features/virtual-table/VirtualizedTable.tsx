/** @format */

import React, { CSSProperties, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import { AutoSizer } from "react-virtualized";
import { GetAllDataResponse, useGetAllDataQuery } from "./VirtualTableApi";
import _ from "lodash";
import "./virtualTableStyle.css";

interface RowType {
  index: number;
  style: CSSProperties;
  data: {
    rows: GetAllDataResponse[];
    columns: (keyof GetAllDataResponse)[];
  };
}

const Row = ({ index, style, data }: RowType) => {
  const item = data.rows[index];
  const columns = data.columns;

  return (
    <div
      className={`table-row ${
        index % 2 === 0 ? "oddRow" : "evenRow"
      } row-bottom`}
      style={style}
    >
      {_.map(columns, (column, j) => (
        <div className={`table-column ${j === 0 ? "id" : "field"}`} key={j}>
          {_.toString(item[column])}
        </div>
      ))}
    </div>
  );
};

const VirtualizedTable = () => {
  const { data = [], isLoading, error } = useGetAllDataQuery();

  const columns: (keyof GetAllDataResponse)[] = useMemo(
    () => (data ? (_.keys(data[0]) as (keyof GetAllDataResponse)[]) : []),
    [data]
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error ...</h1>;
  }

  return (
    <div className="table">
      <div className="table-row  header-row">
        {_.map(columns, (column, i) => (
          <div
            className={`table-column header-column ${i === 0 ? "id" : "field"}`}
            key={i}
          >
            {_.startCase(column)}
          </div>
        ))}
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height * 10}
            itemCount={data.length}
            itemSize={height}
            width={width}
            itemData={{ rows: data, columns }}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedTable;
