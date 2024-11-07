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
          content={
            <div className={styles.list}>
              {options.map((option, index) => {
                return (
                  <>
                    <div
                      key={index}
                      onClick={() =>{ handleSelect(option.label);
                        closeContext(label !== "" ? label + "test" : "test")
                      }}
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
                                option.label + "test",
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
        />
      )}
    </>
  );
};
export default DsOption;
