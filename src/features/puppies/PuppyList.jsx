/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */

import { useEffect, useState } from "react";
import { useGetPuppiesQuery } from "./puppyListSlice";

// eslint-disable-next-line react/prop-types
export default function PuppyList({ setSelectedPuppyId }) {
  // TODO: Get data from getPuppies query

  // useGetPuppiesQuery,
  // useGetPuppyQuery,
  // useAddPuppyMutation,
  // useDeletePuppyMutation,

  const { data: newPuppyList, isSuccess, isLoading } = useGetPuppiesQuery();
  // console.log("isSuccess", isSuccess);
  // isSuccess && console.log("newPuppyList", newPuppyList.data.players);

  // const [deletePuppy] = useDeletePuppyMutation();

  const [puppies, setPuppies] = useState([]);

  // watch and get new puppy list.
  useEffect(() => {
    if (isSuccess) {
      console.log("PUPPYLIST UPDATED useEffect + success");
      // console.log("update puppies..");
      setPuppies(newPuppyList.data.players);
    }
  }, [isSuccess, newPuppyList]);

  return (
    <article>
      <h2>Roster</h2>
      <ul className="puppies">
        {isLoading && <li>Loading puppies...</li>}
        {puppies.map((p) => (
          <li key={p.id}>
            <h3>
              {p.name} #{p.id}
            </h3>
            <figure>
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <button onClick={() => setSelectedPuppyId(p.id)}>
              See details
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
