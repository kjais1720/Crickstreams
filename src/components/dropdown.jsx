import styles from "./styles/dropdown.module.css";
export const DropDownMenu = ({ menuButtons }) => {
  return (
    <div className={`${styles.dropdownWrapper} ml-auto pd-x-sm`}>
      <button className="tr-btn tr-btn-icon ">
        <i className="fas fa-ellipsis-v txt-md"></i>
      </button>
      <ul className={`flex-col ${styles.dropdown}`}>
        {menuButtons.map(({ name, clickHandler, icon }, idx) => (
          <button onClick={clickHandler} className="tr-btn tr-btn-transparent txt-sm d-flex gap-xs" key={idx}>
            <i className={`far fa-${icon}`}></i>
            {name}
          </button>
        ))}
      </ul>
    </div>
  );
};
