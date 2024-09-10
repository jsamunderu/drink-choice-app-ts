import { data } from "@/lib/definitions";
import React from "react";

const TABLE_HEAD = [
  "Id",
  "Name",
  "Predictions",
  "Questions",
];
 
export function ResultTable() {
  return (
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-4 pt-10">
                <p
                  color="blue-gray"
                  className="font-bold leading-none"
                >
                  {head}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((elem, index) => {
            return (
              <tr key={index}>
                <td className="p-4">
                  <p
                    color="blue-gray"
                    className="font-bold"
                  >
                    {elem.id}
                  </p>
                </td>
                <td className="p-4">
                  <p
                    className="font-normal text-gray-600"
                  >
                    {elem.attributes.name}
                  </p>
                </td>
                <td className="p-4">
                  <p
                    className="font-normal text-gray-600"
                  >
                    {elem.attributes.metadata.prediction.domain.values.join(" ")}
                  </p>
                </td>
                <td className="p-4">
                  <p
                    className="font-normal text-gray-600"
                  >
                    {elem.attributes.metadata.attributes.reduce((acc, curr)=>`$acc curr`,"")}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
  );
}

