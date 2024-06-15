import Input from "../../../../components/Input";
import Ingredient from "./Ingredient";
import Button from "../../../../components/Button";

export default function IngredientsTable({header,tableId,setTableHeader,deleteTable}) {


return     <div className="bg-lime-200 rounded-lg p-4 flex flex-col gap-4 relative">
<button className="absolute right-2 top-2 text-xl"
onClick={()=>deleteTable(tableId)}
>&#10005;</button>
<Input label='ชื่อหัวตาราง' textCenter="left" name='header'
value={header} onChange={e => setTableHeader(tableId,e.target.value)} />
<ul>
    <li>
        <Ingredient />
    </li>
</ul>
<Button>เพิ่มวัตถุดิบในตาราง</Button>
</div>

}