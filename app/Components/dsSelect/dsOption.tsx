import DSButton from "../DsButton/DsButton";
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
  id?: string;
  label?: string;
  isOpen: boolean;
  options: Option[];
  handleSelect: (value: string) => void;
}

const DsOption: React.FC<DsOptionProps> = ({
  id = "",
  label = "",
  isOpen,
  options,
  handleSelect,
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
                        closeContext(
                          label !== "" ? label + "opt" : id !== "" ? id : "test"
                        );
                      }}
                      //onFocus={() => displayContext}
                      className={styles.option}
                    >
                      {option.label}
                      {typeof option.value !== "string" && (
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
                        handleSelect={handleSelect}
                      ></DsOption>
                    )}
                  </>
                );
              })}
            </div>
          }
          showArrow={false}
        />
      )}
    </>
  );
};
export default DsOption;
