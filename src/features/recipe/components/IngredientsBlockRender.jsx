export default function IngredientsBlockRender ({header,ingredient}) {
    return <div>
        <h1 className="font-semibold mb-4">{header}</h1>
        <ul>
        {ingredient.map(el => <li key={el.id} className="grid grid-cols-4">
            <span className="col-span-2">{el.name}</span>
            <span>{el.amount}</span>
            <span>{el.unit}</span>
        </li>)}
        </ul>
    </div>
}