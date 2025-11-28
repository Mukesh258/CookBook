import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UploadRecipeForm from '../components/UploadRecipeForm';
import { getUploadedRecipeFromServer, getUploadedRecipesFromServer } from '../utils/api';
import { getUploadedRecipes } from '../utils/localStorage';
import './UploadRecipe.css';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    (async () => {
      // Try server first (numeric id)
      let loaded = null;
      if (!isNaN(Number(id))) {
        loaded = await getUploadedRecipeFromServer(Number(id)).catch(() => null);
      }
      if (!loaded) {
        // check localStorage uploaded recipes
        const local = getUploadedRecipes();
        loaded = local.find(r => String(r.id) === String(id)) || null;
      }
      setRecipe(loaded);
    })();
  }, [id]);

  const handleSuccess = () => {
    navigate('/community');
  };

  if (!recipe) {
    return (
      <div className="upload-recipe-page">
        <div className="container">
          <h2>Loading recipe for editing…</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-recipe-page">
      <div className="container">
        <UploadRecipeForm initialData={recipe} editMode={true} onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default EditRecipe;
