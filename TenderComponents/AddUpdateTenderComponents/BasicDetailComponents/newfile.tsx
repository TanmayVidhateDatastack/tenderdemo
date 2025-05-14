useEffect(() => {
  const checkConditionVisible = { ...conditionsVisibility };

  (metaData.applicableSupplyConditions || []).forEach((opt) => {
    const id = opt.value.toString();
    const checkbox = document.getElementById(id) as HTMLInputElement;

    const isInTender = tenderData.tenderSupplyCondition?.applicableConditions?.some(
      (ac) => ac.type === id
    );

    let isVisible = true;

    if (checkbox?.checked) {
      selectedConditions.add(id);
      isVisible = true;

      if (isInTender) {
        updateApplicableCondition(id, "status", "ACTV");
      } else {
        addApplicableCondition(id);
      }

    } else if (tenderData.id !== undefined && !isInTender) {
      // Tender exists but doesn't have this condition
      selectedConditions.delete(id);
      isVisible = false;
      updateApplicableCondition(id, "status", "INAC");

    } else {
      // Either new tender or existing with the condition
      selectedConditions.add(id);
      isVisible = true;

      if (isInTender) {
        updateApplicableCondition(id, "status", "ACTV");
      }
    }

    checkConditionVisible[id] = isVisible;
  });

  setConditionsVisibility(checkConditionVisible);
}, [metaData.applicableSupplyConditions, tenderData.id]);
