import DSButton from "../dsButton/dsButton";
import PopUpContext, {
  closecontext,
  displaycontext,
} from "@/app/Components/dsContext/dsContext";
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
                      onClick={() =>{ handleSelect(option.label);
                        closecontext(label !== "" ? label + "test" : "test")
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
                              displaycontext(
                                e,
                                option.label + "test",
                                option.label + "test1",
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
