import styles from "./deposite.module.css";
import Image from "next/image";
import downarrow from "@/Common/TenderIcons/smallIcons/verticleArrow.svg";
import { useState, useEffect } from "react";
import React from "react";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import ContextMenu, {
  closeAllContext,
  createContext
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import {
  displayContext,
  closeContext
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { DsSelectOption } from "@/Common/helpers/types";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";

import DsSupplyConditions from "./DsSupplyConditions";
import { useTenderData } from "../TenderDataContextProvider";
import IconFactory from "@/Elements/IconComponent";

export interface ApplicableConditionsProps {
  applicableConditions: DsSelectOption[] | [];
}
