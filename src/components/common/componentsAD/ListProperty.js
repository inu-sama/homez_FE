import React, { useEffect } from "react";

export default function ListProperty({ data, result }) {
  useEffect(() => {
    console.log("Data:", data);
    console.log("Result:", result);
  }, [data, result]);
  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Loại căn hộ</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {(result.length > 0 ? result : data).map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.Title}</td>
              <td>{item.Type}</td>
              <td>{item.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
