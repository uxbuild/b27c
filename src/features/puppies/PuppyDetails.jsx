/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */

import { useEffect, useState } from "react";
import { useGetPuppyQuery, useDeletePuppyMutation } from "./puppyListSlice";

export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  // TODO: Grab data from the `getPuppy` query
  const {
    data: newPup,
    isSuccess,
    isLoading,
  } = useGetPuppyQuery(selectedPuppyId);
  // console.log("isSuccess", isSuccess);
  // isSuccess && console.log("newpup", newPup.data.player);

  // puppyDetails
  const [puppy, setPuppy] = useState({});
  const [ deletePup, {data, isSuccess:isSuccessDelete, isLoading:isLoadingDelete, isError:isErrorDelete} ] = useDeletePuppyMutation();

  // get puppy details..
  useEffect(() => {
    if (isSuccess) {
      console.log("GET RECORD DETAILS success..");
      setPuppy(newPup.data.player);
    }
  }, [isSuccess]);

  // delete puppy record..
  useEffect(()=>{
    if(isSuccessDelete){
      console.log('DELETED RECORD useEffect success..');
      setSelectedPuppyId(null);
    }
  },[isSuccessDelete]);

  // TODO: Use the `deletePuppy` mutation to remove a puppy when the button is clicked
  function removePuppy() {
    // setSelectedPuppyId();
    deletePup(selectedPuppyId);
  }

  // There are 3 possibilities:
  let $details;
  // 1. A puppy has not yet been selected.
  if (!selectedPuppyId) {
    $details = <p>Please select a puppy to see more details.</p>;
  }
  //  2. A puppy has been selected, but results have not yet returned from the API.
  else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  }
  // 3. Information about the selected puppy has returned from the API.
  else {
    // console.log("display puppy..");
    // console.log("puppy", puppy);

    $details = (
      <>
        <h3>
          {puppy.name} #{puppy.id}
        </h3>
        <p>{puppy.breed}</p>
        <p>Team {puppy.team?.name ?? "Unassigned"}</p>
        <button onClick={() => removePuppy(puppy.id)}>
          Remove from roster
        </button>
        <figure>
          <img src={puppy.imageUrl} alt={puppy.name} />
        </figure>
      </>
    );
  }

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {$details}
    </aside>
  );
}
