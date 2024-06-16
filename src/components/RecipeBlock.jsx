import Button from "./Button";

export default function RecipeBlock ({header,owner,picture,preparedTime}) {
    return <div className="">
        <div>{picture}</div>
        <div>
            <div>
            <h2>{header}</h2>
            <p>โดย คุณ{owner}</p>
            </div>
            <div>
            <div>
                <span>เวลาเตรียม</span>
                <span>{preparedTime}</span>
                <span>นาที</span>
            </div>
            <Button textColor='white'>เพิ่มในเมนูโปรด</Button>
            </div>
        </div>
    </div>
}