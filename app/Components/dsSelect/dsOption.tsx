import DSButton from "../dsButton/dsButton";
import PopUpContext, {
  closeContext,
  displayContext,
} from "@/app/Components/dsContextHolder/dsContextHolder";
import styles from "./dsSelect.module.css";

interface Option {
  label: string;
  value: string | Option[];
}
interface DsOptionProps {
  selectId?: string;
  id?: string;
  label?: string;
  isOpen: boolean;
  options: Option[];
  handleSelect: (value: string) => void;
  type: string;
  selectedOptions: string[];
}

const DsOption: React.FC<DsOptionProps> = ({
  id = "",
  label = "",
  isOpen,
  options,
  handleSelect,
  type,
  selectedOptions,
}) => {
  return (
    <>
      {isOpen && (
        <PopUpContext
          id={label !== "" ? label + "opt" : id !== "" ? id : "test"}
          content={
            <div className={styles.list}>
              {options.map((option, index) => {
                return (
                  <>
                    <div
                      key={index}
                      onClick={() => {
                        handleSelect(option.label);
                        if (type !== "multi") {
                          closeContext(
                            label !== ""
                              ? label + "opt"
                              : id !== ""
                              ? id
                              : "test"
                          );
                        }
                      }}
                      className={styles.option}
                    >
                      {type == "multi" && (
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(option.label)}
                          className={styles.checkbox}
                        ></input>
                      )}

                      {option.label}
                      {typeof option.value !== "string" &&
                        type == "twolevel" && (
                          <DSButton
                            className={styles.ShowContext}
                            handleOnClick={(e) => {
                              e.stopPropagation();
                              if (typeof option.value !== "string") {
                                displayContext(
                                  e,
                                  option.label + "opt",
                                  "vertical",
                                  "left"
                                );
                              }
                            }}
                          >
                            d
                          </DSButton>
                        )}
                    </div>
                    {typeof option.value !== "string" && (
                      <DsOption
                        key={index}
                        label={option.label}
                        isOpen={true}
                        options={option.value}
                        // handleSelect={handleSelect}
                        handleSelect={(subOption) => {
                          handleSelect(subOption);
                          if (type !== "multi") {
                            closeContext(
                              label !== ""
                                ? label + "opt"
                                : id !== ""
                                ? id
                                : "test"
                            );
                          }
                        }}
                        type={type}
                        selectedOptions={selectedOptions}
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
