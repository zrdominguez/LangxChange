import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CreateCollectionModal.css";
import { clearErrors, selectErrors, thunkCreateCollection } from "../../redux/collection";

function CreateCollectionModal() {
  const dispatch = useDispatch();
  const [collectionName, setCollectionName] = useState("");
  const [language, setLanguage] = useState("");
  const createErrors = useSelector(selectErrors);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (Object.keys(createErrors || {}).length > 0) {
      setErrors(createErrors);
    } else {
      dispatch(clearErrors());
      setErrors({});
      closeModal();
    }
  }, [createErrors, dispatch, closeModal]);

  const handleChange = e => {
    setLanguage(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(thunkCreateCollection({collectionName, language}))
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
        {errors.collectionName && <p>{errors.collectionName.toString()}</p>}
        <label htmlFor='language'>
          Language:
        </label>
        <select
            name="language"
            id="languages"
            onChange={handleChange}
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
        {errors.language && <p>{errors.language.toString()}</p>}
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateCollectionModal;
