import { useState, useEffect } from "react";
import {
  useAddPuppyMutation,
  // useDeletePuppyMutation,
  // useGetPuppyQuery,
  // useGetPuppiesQuery,
} from "./puppyListSlice";

/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */
export default function PuppyForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  const [addPuppy, {data, error, isError, isLoading, isSuccess}] = useAddPuppyMutation();

  // TODO: Use the `addPuppy` mutation to add a puppy when the form is submitted
  async function postPuppy(event) {
    event.preventDefault();
    const imageUrl = "https://loremflickr.com/200/300/dog";

    try {
      const response = await addPuppy({ name, breed, imageUrl }).unwrap();
      console.log("response", response);
      console.log("RESPONSE DATA", data);
    } catch (error) {
      console.log("error", error);
    }
  }

  function resetForm(){
    setName("");
    setBreed("")
  }

// ADD RECORD useEffect..
useEffect(()=>{
  if (isSuccess) {
    console.log("ADD PUPPY useEffect success", data);
    resetForm();
  }
},[isSuccess]);

  return (
    <>
      <h2>Add a Puppy</h2>
      <form onSubmit={postPuppy}>
        <label>
          Name
          <input
            name="puppyName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Breed
          <input
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <button>Add to Roster</button>
        {error && <output>{error.message}</output>}
        {/* {isError && <output>{error.message}</output>} */}
      </form>
    </>
  );
}
