import IngredientForm from "../features/recipe/create/components/IngredientForm";
import MainRecipeForm from "../features/recipe/create/components/MainRecipeForm";
import StepForm from "../features/recipe/create/components/StepForm";

export default function CreateRecipePage () {
    return (
<div className="px-8 flex flex-col gap-4">
<h1 className="text-3xl text-center font-semibold">เขียนสูตรอาหารใหม่</h1>
<MainRecipeForm />
<IngredientForm />
<StepForm />
</div>
)
}