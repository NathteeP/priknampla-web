export default function StepRender ({step}) {
    return <div className="ml-4">
        <ol className="list-decimal font-semibold flex flex-col gap-3">
        {step?.map(el => <div key={el.id}><li>
        {el.header}
        </li>
        <p className="font-normal">{el.description}</p>
        </div> )}
        </ol>

    </div>
}