import styles from "./styles/dropdown.module.css";
export const DropDownMenu = ({ menuButtons }) => {
  return (
    <div className={`${styles.dropdownWrapper} ml-auto pd-x-sm`}>
      <button className="tr-btn tr-btn-icon ">
        <i className="fas fa-ellipsis-v txt-md"></i>
      </button>
      <ul className={`flex-col ${styles.dropdown}`}>
        {menuButtons.map(({ name, clickHandler }, idx) => (
          <button onClick={clickHandler} className="tr-btn tr-btn-transparent txt-sm" key={idx}>
            {name}
          </button>
        ))}
      </ul>
    </div>
  );
};
