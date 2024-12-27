import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CreateCollectionModal.css";
import { selectErrors, thunkCreateCollection } from "../../redux/collection";

function CreateCollectionModal() {
  const dispatch = useDispatch();
  const [collectionName, setCollectionName] = useState("");
  const [language, setLanguage] = useState("");
  const createErrors = useSelector(selectErrors);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await dispatch(thunkCreateCollection({collectionName, language}))
      closeModal()
    } catch (e){
      setCollectionName("")
    }
  };

  return (
    <>
      <h1>Create a Collection</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Collection Name
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            required
          />
        </label>
        {createErrors.collectionName && <p>{createErrors.collectionName.toString()}</p>}
        <label htmlFor='language'>
          Language:
        </label>
        <select
            name="language"
            id="languages"
            onChange={e => setLanguage(e.target.value)}
            value={language}
            required
          >
            <option value="" disabled>
              Select a language
            </option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Japanese">Japanese</option>
        </select>
        {createErrors.language && <p>{createErrors.language.toString()}</p>}
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateCollectionModal;
