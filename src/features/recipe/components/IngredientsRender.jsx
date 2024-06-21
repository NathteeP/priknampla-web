import IngredientsBlockRender from "./IngredientsBlockRender";

export default function IngredientsRender ({ingredientsTable}) {
    return <div className="grid grid-cols-2 my-8">
        {ingredientsTable?.map(el => <IngredientsBlockRender
            key={el.tableId} header={el.header} ingredient={el.ingredient}
            />)}
    </div>
}