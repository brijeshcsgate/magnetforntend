import "./InspectionAccordian.css";
import { arrowTraingleIcon, copyIcon, crossIcon } from "@/assets/Icons";
export function InspectionAccordian({
  todo,
  dateTime,
  icon,
  toggleOpenVal,
  deleteTodoMenu,
}) {
  return (
    <div className="aifbc-flex-g14-2 ">
      <div
        className="aifbc-flex-9 pb-2"
        style={{ width: "98%", marginTop: "8px", marginRight: "8px" }}
      >
        <div
          className="aifbc-ml-24-mt-5"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
          onClick={() => toggleOpenVal(todo.id)}
        >
          <span className="acc-onSelect">
            {arrowTraingleIcon({ width: 30, height: 20 })}
          </span>
          <span>Title</span>
        </div>
        <div className="aifbc-flex-5 aifbc-jc-r">
          <div
            className="aifbc-date-time-cal aifbc-flex-5 aifc-onSelect"
            style={{ paddingLeft: "10px" }}
          >
            <span>{icon}</span>
            <span className="aifbc-txt-8-400-002850">{dateTime}</span>
          </div>
          <div className="aifc-onSelect">
            {copyIcon({ width: 30, height: 20 })}
          </div>
          <div
            onClick={() => deleteTodoMenu(todo.id)}
            className="aifc-onSelect"
          >
            {crossIcon({ width: 30, height: 20 })}
          </div>
        </div>
      </div>
    </div>
  );
}
