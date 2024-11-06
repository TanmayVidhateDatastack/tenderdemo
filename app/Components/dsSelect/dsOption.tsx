import PopUpContext, { displaycontext } from "../dsContext/dscontext";
import styles from "./dsSelect.module.css";

interface Option {
  label: string;
  value: string | Option[];
}
interface DsOptionProps {
  label?: string;
  isOpen: boolean;
  options: Option[];
  handleSelect: (value: string) => void;
}

const DsOption: React.FC<DsOptionProps> = ({
  label = "",
  isOpen,
  options,
  handleSelect,
}) => {
  return (
    <>
      {isOpen && (
        <PopUpContext
          id={label !== "" ? label + "test" : "test"}
          containerId={label !== "" ? label + "test1" : "test1"}
          content={
            <div className={styles.list}>
              {options.map((option, index) => {
                return (
                  <>
                    <div
                      key={index}
                      onClick={() => handleSelect(option.label)}
                      className={styles.option}
                      onMouseOver={(e) => {
                        if (typeof option.value !== "string")
                          displaycontext(
                            e,
                            option.label + "test",
                            option.label + "test1",
                            "vertical",
                            "left"
                          );
                      }}
                    >
                      {option.label}
                    </div>
                    {typeof option.value !== "string" && (
                      <DsOption
                        key={index}
                        label={option.label}
                        isOpen={false}
                        options={option.value}
                        handleSelect={handleSelect}
                      ></DsOption>
                    )}
                  </>
                );
              })}
            </div>
          }
        />
      )}
    </>
  );
};
export default DsOption;
